const UserService = require("../services/UserService");
const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  const { name, image, description, price, countInStock, rating } = req.body;
  try {
    if (!image || !price || !countInStock || !rating || !name) {
      return res.status(200).json({
        status: "err",
        message: "The input is required",
      });
    }
    console.log(req.body);
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "err",
        message: "product ID is required",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "err",
        message: "product ID is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await ProductService.getAllProducts();
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "err",
        message: "product ID is required",
      });
    }
    const response = await ProductService.getDetailProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getDetailProduct,
};
