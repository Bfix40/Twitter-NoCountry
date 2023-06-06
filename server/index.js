
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
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import Message from './models/Message.js';
import Chat from './models/Chat.js';

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
app.use("/api/messages", messageRoutes);

app.use('/public/images', express.static('public/images'));

// Socket
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.NODE_ENV === 'production'
    ? `${process.env.CLIENT_URL}`
    : `${process.env.DEV_CLIENT_URL}`,
  },
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado:', socket.id);

  // Evento para enviar un mensaje
  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, message, details } = data

    // Verificar si el chat existe en la colección de Chats
    const senderChat = await Chat.findOne({userId: senderId, username: details.receiver.username})
    const receiverChat = await Chat.findOne({userId: receiverId, username: details.sender.username})

    if (senderChat) {
      senderChat.lastmessage = details.lastmessage
      senderChat.time = details.time
      await senderChat.save();
    } else {
      const newChat = new Chat({
        userId: senderId,
        chatId: receiverId,
        name: details.receiver.name,
        username: details.receiver.username,
        image: details.receiver.image,
        lastmessage: details.lastmessage,
        time: details.time
      });
      await newChat.save();
    }

    if (receiverChat) {
      receiverChat.lastmessage = details.lastmessage
      receiverChat.time = details.time
      await receiverChat.save();
    } else {
      const newChat = new Chat({
        userId: receiverId,
        chatId: senderId,
        name: details.sender.name,
        username: details.sender.username,
        image: details.sender.image,
        lastmessage: details.lastmessage,
        time: details.time
      });
      await newChat.save();
    }

    // Guardar el mensaje en la base de datos ponerle id y duplicar
    
    const newMessageSender = new Message({ userId: senderId, chatId: receiverId, senderId, receiverId, message });
    const newMessageReceiver = new Message({ userId: receiverId, chatId: senderId, senderId, receiverId, message });

    await newMessageSender.save();
    await newMessageReceiver.save();

    console.log('Mensaje guardado en la base de datos');

    // Emitir el mensaje a los usuarios en la sala adecuada
    socket.to(senderId).to(receiverId).emit('receiveMessage', { senderId, receiverId, message });

    // Emitir evento para actualizar mensajes en ambos usuarios
    io.to(senderId).emit('updateMessages');
    io.to(receiverId).emit('updateMessages');
  });

  // Evento para unirse a una sala de chat
  socket.on('joinChat', (userId) => {
    socket.join(userId);
    console.log('El usuario', userId, 'se ha unido a la sala de chat:', socket.id);
  });

  // Evento para abandonar una sala de chat
  socket.on('leaveChat', (userId) => {
    socket.leave(userId);
    console.log('El usuario', userId, 'ha abandonado la sala de chat:', socket.id);
  });

  // Evento cuando se desconecta un cliente
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado:', socket.id);
  });
});
