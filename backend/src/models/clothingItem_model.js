const mongoose = require('mongoose');

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
    color: {
        type: String,
        required: true,
        trim: true
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