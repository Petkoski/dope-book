const path = require('path');

const express = require('express');

//const adminData = require('./admin');
const shopController = require('../controllers/shop');

const router = express.Router();

/**
 * __dirname - Global variable made available by Node.js
 * Holds the ABSOLUTE path on our OS to this project folder.
 */

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;