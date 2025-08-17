const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  registerController,
  loginController,
  logoutController,
  updateUserController,
  deleteUserController,
  deleteAnyUserController,
  getAllUsersController,
  getUserByIdController,
  getUserActivityController,
} = require("../controllers/userController");

const { protect, admin } = require("../middlewares/authMiddleware");

// Public routes
router.post("/register", upload.single("profile_photo"), registerController);
router.post("/login", loginController);

// Protected routes (authenticated users)
router.post("/logout", protect, logoutController);
router.put("/update", protect, updateUserController);
router.delete("/delete", protect, deleteUserController);
router.get("/activity", protect, getUserActivityController);

// Admin-only routes
router.get("/", protect, admin, getAllUsersController);
router.get("/:id", protect, admin, getUserByIdController);
router.delete("/:id", protect, admin, deleteAnyUserController);

module.exports = router;
