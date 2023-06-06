import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  try {
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    if (!chats) {
      res.status(400).json([]);
    }

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener los Chats" });
  }
});

//@description     Manages the state of snooze chat
//@route           GET /api/chat/snooze
//@access          Protected
const snoozeChat = asyncHandler(async (req, res) => {
  const { senderId, username, value } = req.query;

  try {
    const snoozed = await Chat.findOneAndUpdate({userId: senderId, username}, { snooze: value }, {new: true})

    if (!snoozed) {
      res.status(400).json(!value);
    }

    res.status(200).json(snoozed);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener los Chats" });
  }
});

//@description     Manages the state of pin chat
//@route           GET /api/chat/pin
//@access          Protected
const pinChat = asyncHandler(async (req, res) => {
  const { senderId, username, value } = req.query;

  try {
    const pinned = await Chat.findOneAndUpdate({userId: senderId, username}, { pin: value }, {new: true})

    if (!pinned) {
      res.status(400).json(!value);
    }

    res.status(200).json(pinned);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener los Chats" });
  }
});


//@description     Delete chat with one user and the saved messages
//@route           DELETE /api/chat/
//@access          Protected
const deleteChat = asyncHandler(async (req, res) => {
    const { senderId, receiverId, username } = req.query;
  
    try {
      await Chat.findOneAndDelete({ userId: senderId, username });

      try {
        console.log("Borrando");
        console.log("userId: " + senderId);
        console.log("chatId: " + receiverId);
        await Message.deleteMany({
          userId: senderId,
          chatId: receiverId
        });
      } catch (error) {
        console.log(error);
      }
  
      res.status(200).json({ message: "Chat eliminado correctamente"});
    } catch (error) {
      res.status(500).json({ message: "Hubo un error al eliminar el Chat" });
    }
  });

export { fetchChats, snoozeChat, pinChat, deleteChat};
