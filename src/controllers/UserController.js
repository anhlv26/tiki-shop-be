const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

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

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(200).json({
        status: "err",
        message: "User ID is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers;
    if (!userId) {
      return res.status(200).json({
        status: "err",
        message: "User ID is required",
      });
    }
    const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "err",
        message: "Token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailUser,
  refreshToken,
};
