// filepath: backend/src/routes/routes.js
const express = require('express');
const router = express.Router();
const clothingController = require('../controllers/clothingItem_controller');
const authRoutes = require('./auth_routes');
const cartController = require('../controllers/cart_controller');
const favoritesController = require('../controllers/favorites_controller');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Define routes for user authentication
router.use('/auth', authRoutes);

// Define routes for clothing items
router.get('/clothing', clothingController.getClothingItems);
router.post('/clothing', isAuthenticated, isAdmin, clothingController.createClothingItem); // Add middleware here
router.get('/clothing/:id', clothingController.getClothingItemById);
router.put('/clothing/:id', isAuthenticated, isAdmin, clothingController.updateClothingItem);
router.delete('/clothing/:id', isAuthenticated, isAdmin, clothingController.deleteClothingItem);

// Define routes for cart
router.get('/cart', isAuthenticated, cartController.getCart);
router.post('/cart', isAuthenticated, cartController.addToCart);
router.delete('/cart', isAuthenticated, cartController.removeFromCart);
router.post('/cart/clear', isAuthenticated, cartController.clearCart);

// Define routes for favorites
router.get('/favorites', isAuthenticated, favoritesController.getFavorites);
router.post('/favorites', isAuthenticated, favoritesController.addToFavorites);
router.delete('/favorites', isAuthenticated, favoritesController.removeFromFavorites);

module.exports = router;