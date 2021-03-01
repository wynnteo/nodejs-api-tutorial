const express = require('express');
const router = new express.Router();
const product = require('../app/controllers/product.js')

router.get(`/api/products`, [product.getProducts]);
router.get(`/api/products/:id`, [product.getProductsByID]);
router.post(`/api/products`, [product.addProduct]);
router.put(`/api/products/:id`, [product.updateProduct]);
router.delete(`/api/products/:id`, [product.deleteProduct]);
router.delete(`/api/products`, [product.deleteAllProducts]);

module.exports = router;