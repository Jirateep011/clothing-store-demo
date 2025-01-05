const { ClothingItem } = require('../models/clothingItem_model'); // Import the clothing item model

// Create a new clothing item
exports.createClothingItem = async (req, res) => {
    try {
        const newItem = new ClothingItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all clothing items
exports.getClothingItems = async (req, res) => {
    try {
        const items = await ClothingItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a clothing item by ID
exports.getClothingItemById = async (req, res) => {
    try {
        const item = await ClothingItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a clothing item by ID
exports.updateClothingItem = async (req, res) => {
    try {
        const updatedItem = await ClothingItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a clothing item by ID
exports.deleteClothingItem = async (req, res) => {
    try {
        const deletedItem = await ClothingItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};