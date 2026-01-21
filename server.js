const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Message = require('./models/Message');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get messages for a room
app.get('/messages/:room', async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch messages" });
    }
});

// Create server and Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Track online users: { username: socketId }
let onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // When a user logs in/opens the app, they send their username
    socket.on('add_user', (username) => {
        onlineUsers.set(username, socket.id);
        // Broadcast the list of usernames to all connected clients
        io.emit('get_online_users', Array.from(onlineUsers.keys()));
        console.log(`${username} is now online`);
    });

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('send_message', async (data) => {
        try {
            // Save message to MongoDB
            const newMessage = new Message({
                room: data.room,
                author: data.author,
                message: data.message,
                time: data.time
            });
            const savedMessage = await newMessage.save();

            // Send to everyone in the room with _id
            io.to(data.room).emit('receive_message', { ...data, _id: savedMessage._id });
        } catch (err) {
            console.error("Error handling message:", err);
        }
    });

    // Handle read receipts
    socket.on('mark_as_read', async (data) => {
        try {
            const { messageId, username } = data;
            await Message.findByIdAndUpdate(messageId, { $addToSet: { readBy: username } });
            // Notify the sender
            io.to(data.room).emit('message_read', { messageId, username });
        } catch (err) {
            console.error("Error marking message as read:", err);
        }
    });

    socket.on('disconnect', () => {
        // Find the username associated with this socket ID and remove it
        for (let [username, id] of onlineUsers.entries()) {
            if (id === socket.id) {
                onlineUsers.delete(username);
                console.log(`${username} has gone offline`);
                break;
            }
        }
        // Send updated list to everyone
        io.emit('get_online_users', Array.from(onlineUsers.keys()));
        console.log("User Disconnected", socket.id);
    });
});

server.listen(process.env.PORT || 5000, () => console.log(`Backend running on port ${process.env.PORT || 5000}`));