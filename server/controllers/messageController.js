import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic").execPopulate();
        message = await message.populate("chat").execPopulate();
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const updateMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            req.body,
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }

        return res
            .status(200)
            .json({
                message: "Mensaje modificado correctamente",
                updatedMessage,
            });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error al modificar el mensaje", error });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ message: "Mensaje no encontrado" });
        }

        return res
            .status(200)
            .json({ message: "Mensaje eliminado correctamente" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error al eliminar el mensaje", error });
    }
};

export { sendMessage, allMessages, updateMessage, deleteMessage };