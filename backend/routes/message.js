const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.json(msg);
});

router.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  });
  res.json(messages);
});

module.exports = router;
