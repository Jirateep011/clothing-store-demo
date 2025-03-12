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
    const { productId, color } = req.body;
    const userEmail = req.user.email;

    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId || item.color !== color);
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