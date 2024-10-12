import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //reference to user schema
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, //reference to product schema
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

export const Cart = mongoose.model("Cart", cartSchema);