# Real-Time Chat Application

A modern, secure real-time chat platform built with React, Node.js, Socket.io, and MongoDB. Supports one-on-one and group chats with message encryption, read receipts, and online status indicators.

![Chat App Preview](https://via.placeholder.com/800x400?text=Chat+App+Screenshot) <!-- Replace with actual screenshot -->

## 🚀 Features

- **Real-Time Messaging**: Instant message delivery using WebSockets (Socket.io)
- **User Authentication**: Secure registration and login with JWT tokens
- **One-on-One & Group Chat**: Join rooms for private or group conversations
- **Message Encryption**: End-to-end encryption using AES for message security
- **Read Receipts**: Automatic read status tracking and display
- **Online Status**: Live tracking of online users with visual indicators
- **Typing Indicators**: See when others are typing
- **Message History**: Persistent chat history stored in MongoDB
- **Responsive Design**: Modern UI that works on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Socket.io-client** - Real-time communication
- **Axios** - HTTP requests
- **CryptoJS** - Message encryption
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/charu8103/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application
```

### 2. Install Server Dependencies
```bash
npm install
```

### 3. Install Client Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp  # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_jwt_key_here
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 6. Run the Application

#### Development Mode
Start the server:
```bash
node server.js
```

In a new terminal, start the client:
```bash
cd client
npm start
```

#### Production Mode
Build the client:
```bash
cd client
npm run build
cd ..
```

Start the server:
```bash
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📖 Usage

1. **Register**: Create a new account with username and password
2. **Login**: Sign in with your credentials
3. **Join Chat**: Enter a room ID (e.g., "general" for group chat or "user1-user2" for private)
4. **Start Chatting**: Send messages, see online users, and track read receipts
5. **Encryption**: All messages are automatically encrypted for security

## 🏗️ Project Structure

```
Real-Time-Chat-Application/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.js
│   │   │   └── Login.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── models/                 # MongoDB models
│   ├── User.js
│   └── Message.js
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── server.js               # Express server
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Token-based authentication for sessions
- **Message Encryption**: AES encryption for message content
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured CORS for secure API access

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [MongoDB](https://www.mongodb.com/) for database
- [React](https://reactjs.org/) for frontend framework
- [CryptoJS](https://cryptojs.gitbook.io/docs/) for encryption

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ by [Charu Arya]**

*Replace placeholders with actual information and add screenshots for better presentation.*</content>
<parameter name="filePath">c:\Users\HP\OneDrive\Desktop\Real Time Chat App\README.md
