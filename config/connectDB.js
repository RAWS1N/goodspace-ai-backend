const mongoose = require("mongoose")

// function to communicate with database
const connectDB = async () => {
    try {
      const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.COLLECTION}`, {
        dbName: process.env.DATABASE,
      });
      console.log(`database is connected with ${connection.connection.host}`);
    } catch (e) {
      console.log(e.message);
    }
  };


module.exports = {connectDB}