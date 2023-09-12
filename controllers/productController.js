const Product = require("../models/productModels")
const asyncHandler = require('express-async-handler')
const postProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json({ product })
  } catch (error) {
    console.log(error.message)

    res.status(500)
    throw new Error(error.message);
  }
})
const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({})
    res.status(200).json({ message: product })
  } catch (error) {

    res.status(500)
    throw new Error(error.message);
  }
})

const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id);
    if (!product) {
      res.status(404)
      throw new Error("we cannot find any product having this ${id}");
    }
    res.status(200).json({ message: product })
  } catch (error) {

    res.status(500)
    throw new Error(error.message);
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {

    console.log(error.message)
    res.status(500)
    throw new Error(error.message);
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product, "....................")
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500)
    throw new Error(error.message);


  }
})

module.exports = { postProduct, getProduct, getProductById, updateProduct, deleteProduct }