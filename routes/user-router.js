const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const UserCtrl = require("../controllers/user-ctrl");
const { getUserByEmailPromise } = require("../utils/getUser");
const isName = require("../utils/isName");

router.post(
  "/signup",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid Email Address")
    .custom((value) => {
      return getUserByEmailPromise(value).then(
        () => {
          return Promise.reject(
            "User with this email already exists. Please Login instead !"
          );
        },
        () => {
          return Promise.resolve();
        }
      );
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords don't match !");
    }
    return true;
  }),
  body("firstName").custom((value) => {
    if (!isName(value)) {
      throw new Error(
        "Please enter a valid First Name ! Only alphabetic characters and spaces are valid"
      );
    }
    return true;
  }),
  body("lastName").custom((value) => {
    if (!isName(value)) {
      throw new Error(
        "Please enter a valid Last Name ! Only alphabetic characters and spaces are valid"
      );
    }
    return true;
  }),
  UserCtrl.createUser
);

router.post("/login", UserCtrl.loginUser);

module.exports = router;
