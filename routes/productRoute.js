const express = require("express")

const router = express.Router()

const { postProduct, getProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController")

router.post("/", postProduct)

router.get("/", getProduct)

router.get("/:id", getProductById)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

module.exports = router