const path = require('path'); //core module on top

const express = require('express'); //external modules next

//const rootDir = require('../utils/path');
const adminController = require('../controllers/admin');

const router = express.Router();

//All routes defined here will start with the same string: /admin/...

//GET /admin/add-product
router.get('/add-product', adminController.getAddProduct);

//GET /admin/products
router.get('/products', adminController.getProducts);

//POST /admin/add-product
router.post('/add-product', adminController.postAddProduct);

//GET /admin/edit-product
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;
//exports.routes = router;
//exports.products = products;