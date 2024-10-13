const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createTokenAndSaveCookie = require("../jwt/generateToken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res
        .status(201)
        .json({ message: " User registered successfully",  
          user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        }, });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(404).json({ message: "Invalid User or Password" });
    }

    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.logout = async(req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({ message: "User logged out successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}