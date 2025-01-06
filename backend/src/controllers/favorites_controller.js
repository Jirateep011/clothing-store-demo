const User = require('../models/user_model');

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites');
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
    await user.save();
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: error.message });
  }
};