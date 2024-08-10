import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!, {});

mongoose.connection.on("connected", () => {
  console.log("Connected to db");
});

mongoose.connection.on("error", () => {
  console.log("Error connecting to db");
});

const db = mongoose.connection;

export default db;
