require('dotenv').config()
const { Socket } = require('socket.io')
const cookieParser = require('cookie-parser')
const express = require('express')

const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

const {connectDB} = require('./db/connect') 
const {notFound} = require('./middleware/not-found')
const authRoute = require('./route/auth')
const chatAi = require('./route/facehugginApi')
const chat = require('./route/chat')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticationMiddleware  = require('./middleware/auth')
const { savePrivateMessage } = require('./controller/MessageController')
const { connected } = require('process')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.get('/', authenticationMiddleware, (req, res) => {
    res.json({user: req.user})
})
app.use('/api/v1/chat', (req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/chat', chat)
app.use('/api/v1', chatAi )


let users = {}

io.on("connection", (socket) => {
    socket.on('disconnect', () => {
   
        users = Object.fromEntries(
            Object.entries(users).filter(([key, user]) => user.socketId !== socket.id)
        )
        io.emit('online_users', {...users})
    })
    socket.on("connected_user", (data) => {
        const userData = data.userData

        users[userData._id] = {
            socketId: socket.id,
            userId: userData._id,
            userName: userData.name
        }
        io.emit('online_users', {...users})
    })
    socket.on('private message', async ({content, to , from}) => {
        const recipient = users[to]

        if(!recipient) {
            const saveMessage = await savePrivateMessage({content, to, from, isOnline: "sent"})
            socket.emit('private message', saveMessage)
            return
        } 
        const saveMessage = await savePrivateMessage({content, to, from, isOnline: "delivered"})
        io.to(recipient.socketId).emit('private message', saveMessage)
        socket.emit('private message', saveMessage)
    })

    socket.on("read receipt", (data) => {
        const sender = users[data.senderId]
        io.to(sender.socketId).emit("read receipt", data)
    })
    socket.on('messageStatus', (data) => {
        console.log('receiver read the message')
        // console.log(data)
        io.to(users[data.senderId].socketId).emit('messageStatus', data._id)
    })

    socket.on('typing', ({sendTo, from}) => {
        io.to(users[sendTo].socketId).emit('typing', {typing: true, from})
    })
    socket.on('stopTyping', ({sendTo, from}) => {
        console.log('it stop typing')
        io.to(users[sendTo].socketId).emit('typing', {typing: false, from})
    })
    
})

app.use(errorHandlerMiddleware)
app.use(notFound)
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(3000, () => {
            console.log("Serving running")
        })
    }catch (error) {
        console.log(error)
    }
}

start()

