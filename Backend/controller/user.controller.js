const User = require("../models/user.model");
const bcrypt = require('bcryptjs');

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

    await newUser
      .save()
      .then(() =>
        res.status(201).json({ message: " User registered successfully" })
      );


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

