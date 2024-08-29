const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  const { email, password, confirmPassword, phone, name } = req.body;
  try {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword || !phone || !name) {
      return res.status(200).json({
        status: "err",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "err",
        message: "The email is invalid",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "err",
        message: "The password and confirm password do not match",
      });
    }

    console.log(req.body);
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const loginUser = async (req, res) => {
  const { email, password, confirmPassword, phone, name } = req.body;
  try {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword || !phone || !name) {
      return res.status(200).json({
        status: "err",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "err",
        message: "The email is invalid",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "err",
        message: "The password and confirm password do not match",
      });
    }

    console.log(req.body);
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "err",
        message: "User ID is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

module.exports = { createUser, loginUser, updateUser };
