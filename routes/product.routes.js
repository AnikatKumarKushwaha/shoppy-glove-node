import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

export function routes(app) {
  //product api
  app.get("/product", getAllProducts);
  app.get("/product/:id", getProductById);
  //cart api
  app.post("/cart", authenticateToken, addToCart);
  app.put("/cart", authenticateToken, updateCartItem);
  app.delete("/cart", authenticateToken, deleteCartItem);
  //auth api
  app.post("/register", registerUser);
  app.post("/login", loginUser);
}
