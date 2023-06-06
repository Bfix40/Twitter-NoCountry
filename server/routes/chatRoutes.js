import {Router} from "express";
import {
    deleteChat,
    fetchChats,
    pinChat,
    snoozeChat,
} from "../controllers/chatController.js";
//!const { protect } = require("../middleware/authMiddleware");
import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';
const messageRoutes = Router()

messageRoutes.route("/").get(sessionMiddleware, fetchChats);
messageRoutes.route("/snooze").patch(sessionMiddleware, snoozeChat);
messageRoutes.route("/pin").patch(sessionMiddleware, pinChat);
messageRoutes.route("/").delete(sessionMiddleware, deleteChat);

export default messageRoutes
