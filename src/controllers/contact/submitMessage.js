const contactMeMessage = require("../../schemas/contact-me");
const decodeUserMessage = require("../../utils/decode-user-input");

const submitMessage = async (req, res) => {
  let { name, userMessage } = req.body;
  if (!name) {
    res.status(400).json({ message: "Please enter a name", field: "name" });
  }
  if (!userMessage) {
    res.status(400).json({
      message: "Don't forget to leave a comment",
      field: "userMessage",
    });
  }

  try {
    userMessage = decodeUserMessage(userMessage);
    const newMessage = await new contactMeMessage({
      name,
      userMessage,
    });
    await newMessage.save();
    res.status(201).json({ message: "Your message has been submitted", name });
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};
module.exports = submitMessage;
