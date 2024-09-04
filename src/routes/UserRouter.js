const express = require("express");
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
router.get("/get-all-users", authMiddleware, userController.getAllUsers);
router.get(
  "/get-detail-user/:id",
  authUserMiddleware,
  userController.getDetailUser
);
router.post("/refresh-token", userController.refreshToken);


module.exports = router;
