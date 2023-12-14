const express = require("express")
const router = express.Router()

const productController = require('../controller/product.Controller')

router.get("/products", productController.getAll);


module.exports = router