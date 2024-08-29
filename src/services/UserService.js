const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, confirmPassword, phone, name } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if(checkUser){
        resolve({
          status:"ok",
          message: "user already exists",
        });
      }
      const createUser = await User.create({
        email,
        password,
        confirmPassword,
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

module.exports = { createUser };
