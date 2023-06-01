
import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import { dbConnection } from './config/mongo.js';
import userRouter from "./routes/userRoutes.js";
import tweetRouter from './routes/tweetRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import chatRoutes from './routes/messageRoutes.js';
import messageRoutes from './routes/chatRoutes.js';

// Init express app
const app = express();

// Enable cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? `${process.env.CLIENT_URL}`
        : `${process.env.DEV_CLIENT_URL}`,
  })
);

// Enable incoming JSON data
app.use(express.json());

// Enable incoming Form-Data
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));


//Connection to DB
dbConnection().catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Endpoints
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Twitter backend side' });
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Port has started in port ${process.env.PORT}`);
});

app.use("/api/users", userRouter);
app.use("/api/tweets", tweetRouter);
app.use("/api/comments", commentRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use('/public/images', express.static('public/images'));

// Socket
const io = new Server(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
