const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, phone, name } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser) {
        resolve({
          status: "ok",
          message: "user already exists",
        });
      }

      const hash = bcrypt.hashSync(password, 10);

      const createUser = await User.create({
        email,
        password: hash,
        phone,
        name,
      });
      if (createUser) {
        resolve({
          status: "ok",
          message: "success",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, phone, name } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: "user doesn't exist",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ok",
          message: "the password is incorrect",
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "ok",
        message: "success",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "ok",
          message: "user doesn't exist",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "ok",
        message: "success",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "ok",
          message: "user doesn't exist",
        });
      }
      const deleteUser = await User.findByIdAndDelete(id);
      resolve({
        status: "ok",
        message: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await User.find();
      resolve({
        status: "ok",
        message: "success",
        data: allUsers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });

      if (user === null) {
        resolve({
          status: "ok",
          message: "user doesn't exist",
        });
      }
      resolve({
        status: "ok",
        message: "success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  deleteUser,
  getDetailUser,
};
