const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user-model");
const { getUserByEmailPromise } = require("../utils/getUser");
const { generateToken } = require("../jwt/jwt");

createUser = (req, res) => {
  //check for errors before creating user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  const body = req.body;
  const saltRounds = 10;

  bcrypt.hash(body.password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error occured while hashing password", err);
      return res.status(500).json({
        success: false,
        error: err,
        message: "Error occured while hashing password",
      });
    }
    body.password = hash;
    const user = new User(body);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    user
      .save()
      .then(() => {
        const userId = user._id;
        const jwtToken = generateToken(userId);
        return res.status(201).json({
          success: true,
          token: jwtToken,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "User not created!",
        });
      });
  });
};

loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const invalidCredentials = "Email or password is invalid";

  getUserByEmailPromise(email).then(
    (user) => {
      bcrypt.compare(password, user.password).then((matches) => {
        if (!matches) {
          return res.status(400).json({
            success: false,
            message: invalidCredentials,
          });
        } else {
          const userId = user.id;
          const jwtToken = generateToken(userId);
          return res.status(200).json({
            success: true,
            token: jwtToken,
          });
        }
      });
    },
    () => {
      return res.status(400).json({
        success: false,
        message: invalidCredentials,
      });
    }
  );
};

module.exports = {
  createUser,
  loginUser,
};
