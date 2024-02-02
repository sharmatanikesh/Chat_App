const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

const app = express()
app.use(cors())
app.use(express.json())

const server =http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:  "http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("Connection is made",socket.id)

    socket.on("join_room",(data=>{
        socket.join(data)
        console.log("join data wala",data)
    }))

    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("receive_message",data)
    })
})

server.listen(3001,()=>{
    console.log("Server is Running on port:3001")
})