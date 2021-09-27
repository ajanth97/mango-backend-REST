const User = require("../models/user-model");

const getUserByEmailPromise = (email) =>
  new Promise(function (onResolve, onReject) {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          console.log("User with email: " + email + " Exists !");
          onResolve(user);
        } else {
          console.log("User with email: " + email + " doesn't exist");
          onReject();
        }
      })
      .catch((error) =>
        console.error("Error fetching user from email", error.message)
      );
  });

module.exports = {
  getUserByEmailPromise
}
