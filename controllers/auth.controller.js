import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if a user with the given email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // Create a new user instance
  const user = new User({ name, email, password });
  await user.save();

  // Generate a JWT token for the new user with their ID in the payload
  const token = jwt.sign({ id: user._id }, "firstJwtAuthPractice", {
    expiresIn: "1h",
  });
  res.status(201).json({ token });
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  //checking password
  if (!user || user.password !== password)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "firstJwtAuthPractice", {
    expiresIn: "1h",
  });
  res.json({ token });
};
