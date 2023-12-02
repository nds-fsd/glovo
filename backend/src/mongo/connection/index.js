const mongoose = require("mongoose");

let dbUrl =
  "mongodb+srv://Nuclio:Nuclio123@gloton.ptdjeam.mongodb.net/?retryWrites=true&w=majority";

let mongodb;

exports.connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(dbUrl);

    const mongo = mongoose.connection;
    mongo.on("error", (error) => console.error(error));
  } catch (e) {
    console.log(e);
  }
};

exports.disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
  } catch (err) {
    console.log(err);
  }
};
