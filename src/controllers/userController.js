// src/controllers/userController.js
const User = require("../models/userModel");

// Register user
// Register user with Cloudinary support
exports.registerController = async (req, res) => {
  try {
    const { username, email, phone, password, gender, role, status } = req.body;

    // ✅ Check required fields
    if (!username || !email || !phone || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // ✅ Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ✅ Cloudinary file upload (if file is passed)
    const profile_photo = req.file ? req.file.path : null;

    // ✅ Create user
    const user = await User.create({
      username,
      email,
      phone,
      password,
      profile_photo,
      gender,
      role,
      status,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error registering user", error: err.message });
  }
};

// Login user
exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateToken();
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful", token });
};

// Logout user
exports.logoutController = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Update user
exports.updateUserController = async (req, res) => {
  const { username, email } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { username, email },
    { new: true }
  );
  res.json({ message: "User updated", user: updated });
};

// Delete own account
exports.deleteUserController = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "User deleted" });
};

// Admin: Get all users
exports.getAllUsersController = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Admin: Get user by ID
exports.getUserByIdController = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Admin: Delete user by ID
exports.deleteAnyUserController = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted by admin" });
};

// Get own activity
exports.getUserActivityController = async (req, res) => {
  res.json({ message: "User activity placeholder", user: req.user });
};
