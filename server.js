import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv()

const app = express();
app.use(cors({
    origin: "https://chat-ing.onrender.com",
    credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chat-ing.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log(`Client connected ${socket.id}`);

    // Listen for chat messages with username and text
    socket.on("chat_message", (data) => {
        // data should be { username, text }
        console.log("Client message", data);
        io.emit("chat_message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User Disconnected ${socket.id}`);
    });
});

server.listen(process.env.PORT, () => {
    console.log("Server is running.....",process.env.PORT);
});
