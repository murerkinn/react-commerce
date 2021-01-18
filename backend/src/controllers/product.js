const Product = require('../models/product')

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})

    res.send(products)
  } catch (err) {
    return next(err)
  }
}

exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)

    res.send(product)
  } catch (err) {
    return next(err)
  }
}
