import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  //userId from the authenticated user's request object from middleware
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Trying to find an existing cart for the current user
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    //create a new one with the product and quantityif there is no cart
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    // checking if the product is already in the cart
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity; //incresing the quantity when the product is availble
    } else {
      cart.items.push({ productId, quantity }); //adding new product id when the product is not available
    }
  }
  await cart.save();
  res.status(201).json(cart);
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // Expecting productId and updated quantity in the request body
    const userId = req.user.id; // Get the user's ID from the request (assuming authentication middleware)

    // Find the cart for the logged-in user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart that matches the productId
    const cartItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // Get the user's ID from the request from middleware

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the item exists in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart item deleted successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
