// filepath: backend/src/routes/routes.js
const express = require('express');
const router = express.Router();
const clothingController = require('../controllers/clothingItem_controller');

// Define routes for clothing items
router.get('/clothing', clothingController.getClothingItems);
router.post('/clothing', clothingController.createClothingItem);
router.get('/clothing/:id', clothingController.getClothingItemById);
router.put('/clothing/:id', clothingController.updateClothingItem);
router.delete('/clothing/:id', clothingController.deleteClothingItem);

module.exports = router;