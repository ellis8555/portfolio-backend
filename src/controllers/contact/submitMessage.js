const contactMeMessage = require("../../schemas/contact-me");

const submitMessage = async (req, res) => {
  const { name, userMessage } = req.body;
  const newMessage = await new contactMeMessage({ name, userMessage });
  try {
    await newMessage.save();
    res
      .status(200)
      .json({ success: "your message has been submitted", name, userMessage });
  } catch (error) {
    const getErrorKeys = Object.keys(error.errors);
    const errorMessages = [];
    getErrorKeys.forEach((errorName) => {
      errorMessages.push(error.errors[errorName].properties.message);
    });
    res.status(500).json({ error: errorMessages });
  }
};

module.exports = submitMessage;
