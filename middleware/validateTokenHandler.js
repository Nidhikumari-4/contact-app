const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "User is not authorized" });
        }
        console.log("The decoded user is : ", decoded);
        req.user = decoded.user;
        next();
      });

      if (!token) {
        res
          .status(401)
          .json({ message: "User is not authorized or token is missing" });
      }
    }
  } catch (error) {
    console.log("The error is : ", error);
    res.status(401).json({ error: error.message });
  }
});

module.exports = validateToken;
