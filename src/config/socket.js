import { Server } from "socket.io";
import express from 'express'
import http from 'http'

export const app = express()
export const server = http.createServer(app)

export const io = new Server(server, {
    cors: { origin: ['http://localhost:5173'] }
})

const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log('A user connected => ', socket.id)

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id)
        delete userSocketMap[userId];
    })
})