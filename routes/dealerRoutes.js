const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealerController');

// Define routes for dealer-related operations
router.get('/', dealerController.getAllDealers);
router.get('/:id', dealerController.getDealerById);
router.post('/', dealerController.createDealer);

module.exports = router;
