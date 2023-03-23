const contactMeMessage = require("../../schemas/contact-me");

const findAllMessages = async (req, res) => {
  try {
    const messages = await contactMeMessage.find({});
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = findAllMessages;
