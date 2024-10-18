const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../SocketIO/server");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; //current logged in user

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // res.status(201).json(newMessage );

    try {
      // Find the conversation with both participants
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }, // Updated field name to 'participants'
      }).populate("message"); // Populate the 'messages' field

      // If no conversation exists, return an empty array
      if (!conversation) {
        console.log(conversation);
        return res.status(201).json([]);
      }

      // Return the messages array from the conversation
      const messages = conversation.message || []; // Ensure 'messages' is an array
      res.status(201).json(messages);
    } catch (error) {
      console.log("Error in getMessage", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log("Error i7n sendingMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged-in user

    // Find the conversation with both participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] }, // Updated field name to 'participants'
    }).populate("message"); // Populate the 'messages' field

    // If no conversation exists, return an empty array
    if (!conversation) {
      console.log(conversation);
      return res.status(201).json([]);
    }

    // Return the messages array from the conversation
    const messages = conversation.message || []; // Ensure 'messages' is an array
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
