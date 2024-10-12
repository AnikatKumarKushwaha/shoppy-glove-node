import express from "express";
import { connectDb } from "./config/db.js";
import { routes } from "./routes/product.routes.js";

const app = express();

// MongoDB Connection
connectDb();

// Middleware
app.use(express.json());

// Routes
routes(app);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Port
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
