const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        process.env.MONGODB_URI,
        { useUnifiedTopology: true },
        { useNewUrlParser: true }
      )
      .then(() => console.log("Connected!"));
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
