const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const recieverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();

    const recieverSocketId = getSocketId(recieverId);
    io.to(recieverSocketId).emit("newMessage", newMessage);

    res.status(200).json({
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const recieverId = req.params.id;

    const conversatation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    })?.populate("messages");

    return res
      .status(200)
      .json(conversatation ? conversatation.messages : null);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage, getMessage };
