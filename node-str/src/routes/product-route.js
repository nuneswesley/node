'use strict';

const express = require('express');
const router = express.Router();
const controllerProduct = require('../controllers/product-controller');

router.get('/', controllerProduct.get);
router.get('/:slug', controllerProduct.getBySlug);
router.get('/admin/:id', controllerProduct.getById);
router.post('/', controllerProduct.post);
router.put('/:id', controllerProduct.put);
router.delete('/', controllerProduct.delete);

module.exports = router;