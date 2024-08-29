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
      console.log(comparePassword);
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

module.exports = { createUser, loginUser };
