require('dotenv').config()
const { Socket } = require('socket.io')
const express = require('express')

const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

const {connectDB} = require('./db/connect') 
const {notFound} = require('./middleware/not-found')
const authRoute = require('./route/auth')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}})

const users = {}
io.on('connection', (socket) => {

    socket.on('join', ({userId}) => {
        users[userId] = socket.id
        io.emit('online users', users)
    })
    socket.on('private message', ({content, to}) => {
        const recipientSocketId = users[to]
        if(recipientSocketId) {
            io.to(recipientSocketId).emit('private message', {
                content: content,
                date: new Date().toLocaleDateString()
            })
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
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use('/api/v1/auth', authRoute)

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

