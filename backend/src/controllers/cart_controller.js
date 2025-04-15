const Cart = require('../models/cart_model');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.user.email }).populate('items.productId');
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, color, colorImage } = req.body;
    const userEmail = req.user.email;

    let cart = await Cart.findOne({ userEmail });
    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId && item.color === color);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, color, colorImage });
    }

    await cart.save();
    const populatedCart = await cart.populate('items.productId').execPopulate();
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId, color } = req.body; // Ensure these fields are correctly extracted
    const userEmail = req.user.email;

    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.color === color);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    cart.items.splice(itemIndex, 1);

    await cart.save();
    const populatedCart = await cart.populate('items.productId').execPopulate();
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error in clearCart:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, color, quantity } = req.body;
    const userEmail = req.user.email;

    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.color === color);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    const populatedCart = await cart.populate('items.productId').execPopulate();
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    res.status(500).json({ message: error.message });
  }
};