require('dotenv').config()
require('./config/DBC')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const Message = require('./model/messageModel')


const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static('public'))
io.on('connection', (Socket)=>{
    console.log('new client connected');

    Message.find().then(messages =>{
        Socket.emit('initialMessage', messages)
    })
    Socket.on('sendMessage', (data)=>{
        const newMessage = new Message(data)
        newMessage.save().then(()=>{
            io.emit("message", data)
        })
    })
    Socket.on('disconnect', ()=>{
        console.log('client disconnected')
    })
})

const port = process.env.port || 4000
server.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})