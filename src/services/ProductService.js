const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, description, price, countInStock, rating } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct) {
        resolve({
          status: "ok",
          message: "product already exists",
        });
      }

      const createProduct = await Product.create({
        name,
        image,
        description,
        price,
        countInStock,
        rating,
      });
      if (createProduct) {
        resolve({
          status: "ok",
          message: "success",
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "ok",
          message: "product doesn't exist",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "ok",
        message: "success",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "ok",
          message: "product doesn't exist",
        });
      }
      const deleteProduct = await Product.findByIdAndDelete(id);
      resolve({
        status: "ok",
        message: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProducts = (limit = 2, page = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProducts = await Product.countDocuments();
      const allProducts = await Product.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "ok",
        message: "success",
        data: allProducts,
        total: totalProducts,
        pageCurrent: Number(page + 1),
        totalPages: Math.ceil(totalProducts / limit),
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });

      if (product === null) {
        resolve({
          status: "ok",
          message: "product doesn't exist",
        });
      }
      resolve({
        status: "ok",
        message: "success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getDetailProduct,
};
