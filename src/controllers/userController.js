const User = require("../models/userModel");

// Get all users (without password)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      password,
      profile_photo,
      gender,
      role,
      status,
    } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      phone,
      password,
      profile_photo,
      gender,
      role,
      status,
    });

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: newUser.status,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Registration failed", error: err.message });
  }
};

module.exports = {
  getUsers,
  registerUser,
};
