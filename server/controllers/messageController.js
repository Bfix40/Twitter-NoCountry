import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";

//@description     Get all Messages
//@route           GET /api/messages/
//@access          Protected
const allMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Message.find({
      userId: senderId,
      chatId: receiverId,
    }).sort({ createdAt: 1 });

    if (!messages) {
      res.status(400).json([]);
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};

//@description     Delete a single message
//@route           DELETE /api/message/
//@access          Protected
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    return res.status(200).json({ message: "Mensaje eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el mensaje", error });
  }
};

export { allMessages, deleteMessage };
