const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection Failed");
  }
};

module.exports=connectDb;
