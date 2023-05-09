const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(404).json({ message: "All fields are mandatory !" });
    }
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      res.status(400).json({ message: "User already registered!" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed Password: ", hashedPassword);
    // const user = await User.create({
    //   username,
    //   email,
    //   password: hashedPassword,
    // });

    // console.log(`User created ${user}`);

    // if (user) {
    //   res.status(201).json({ _id: user.id, email: user.email });
    // } else {
    //   res.status(400).json({ message: "User data us not valid" });
    // }

    res.json({ message: "Register the user" });
  } catch (error) {
    console.log("The error is : ", error);
    res.status(404).json({ error: error.message });
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

//@desc Current user info
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user Information" });
});

module.exports = { registerUser, loginUser, currentUser };