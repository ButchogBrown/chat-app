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
const chat = require('./route/chat')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticationMiddleware  = require('./middleware/auth')

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
const users = {}
io.on('connection', (socket) => {
    socket.on('join', ({userData}) => {
        users[userData._id] = {
            userId: userData._id,
            userName: userData.name,
            userSocketId: socket.id
        }
        io.emit('online users', users)
       console.log('login userssdfsdfsdfsdfdsdfdsdff' ,users)
    })
    socket.on('private message', ({content, to}) => {
        const recipientSocketId = users[to]
        if(recipientSocketId) {
            io.to(recipientSocketId.userSocketId).emit('private message', {
                content: content,
                date: new Date().toLocaleDateString()
            })
            socket.emit('private message',{
                content: content, 
                date: new Date().toLocaleDateString
            } )
        }
    })
    socket.on('message', (data) => {
        const message = {
            content: data,
            date: new Date().toLocaleDateString()
        }
        socket.emit('message', message)
    })
})
app.use(express.json())

app.get('/', authenticationMiddleware, (req, res) => {
    res.json({user: req.user})
})
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/chat', chat)
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

