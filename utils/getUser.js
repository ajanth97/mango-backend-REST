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

const getUserByIdPromise = (id) =>
  new Promise(function (onResolve, onReject) {
    User.findOne({ _id: id })
      .then((user) => {
        if (user) {
          console.log("User with id: " + id + " Exists !");
          onResolve(user);
        } else {
          console.log("User with id: " + id + " doesn't exist");
          onReject();
        }
      })
      .catch((error) =>
        console.error("Error fetching user from email", error.message)
      );
  });

module.exports = {
  getUserByEmailPromise,
  getUserByIdPromise,
};
