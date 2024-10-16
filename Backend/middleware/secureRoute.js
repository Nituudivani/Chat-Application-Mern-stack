const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authorizedd" });
    }

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findById(verified.userId).select("-password"); //current logged user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
};

module.exports = secureRoute;