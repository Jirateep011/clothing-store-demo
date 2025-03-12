const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
  quantity: { type: Number, required: true, default: 1 },
  color: { type: String, required: true }, // Add color field
  colorImage: { type: String, required: true } // Add colorImage field
});

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;