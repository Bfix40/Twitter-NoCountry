import {Router} from "express";
import {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} from "../controllers/chatController.js";
//!const { protect } = require("../middleware/authMiddleware");
import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';
const messageRoutes = Router()

messageRoutes.route("/").post(sessionMiddleware, accessChat);
messageRoutes.route("/").get(sessionMiddleware, fetchChats);
messageRoutes.route("/group").post(sessionMiddleware, createGroupChat);
messageRoutes.route("/rename").put(sessionMiddleware, renameGroup);
messageRoutes.route("/groupremove").put(sessionMiddleware, removeFromGroup);
messageRoutes.route("/groupadd").put(sessionMiddleware, addToGroup);

export default messageRoutes
