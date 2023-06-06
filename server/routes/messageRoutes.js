import { Router } from "express";
import { allMessages, deleteMessage } from "../controllers/messageController.js";
//!const { protect } = require("../middleware/authMiddleware");

import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';
const chatRoutes = Router();

chatRoutes.route("/").get(sessionMiddleware, allMessages);
chatRoutes.route("/").delete(sessionMiddleware, deleteMessage);

export default chatRoutes
