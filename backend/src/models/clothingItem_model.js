const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    required: true,
    default: 'Free size'
  },
  colors: {
    type: [colorSchema], // Define colors as an array of colorSchema
    default: [] // Default to an empty array
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
});

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);

module.exports = {
  ClothingItem
};