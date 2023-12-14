const express = require("express")
const router = express.Router()

const productController = require('../controllers/product.Controller')

router.get("/", productController.getAll);


module.exports = router