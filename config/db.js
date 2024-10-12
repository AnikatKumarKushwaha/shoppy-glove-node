import mongoose from "mongoose";

export async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017/ShoppyGlove");

  const db = mongoose.connection;

  db.on("open", () => {
    console.log("connection sucessful");
  });

  db.on("error", (err) => {
    console.log("Connection unsucessful", err);
  });
}
