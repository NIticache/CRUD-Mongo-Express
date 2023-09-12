const Product = require("../modals/productModels")

const postProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json({ product })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}
const getProduct = async (req, res) => {
  try {
    const product = await Product.find({})
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    console.log(product, "....................")
    if (!product) {
      return res.status(404).json({ message: `we cannot find any product having this ${id}` })
    }
    res.status(200).json({ message: product })
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

module.exports = { postProduct, getProduct, getProductById, updateProduct, deleteProduct }