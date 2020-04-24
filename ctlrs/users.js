const User = require("./../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Get all users
exports.get = () => {
  try {
    return User.find();
  } catch (error) {
    console.log("Error in players get function");
    console.log(error);
  }
};

// Create a new user with hashed password
exports.create = async (username, password) => {
  const duplicateUsernameCheck = await User.findOne({ username: username });
  if (duplicateUsernameCheck) {
    const duplicateUsernameMessage = "duplicate";
    return duplicateUsernameMessage;
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        const user = new User({
          username: username,
          password: hash,
          roles: ["standard"],
        });
        const createdUser = await user.save();
        console.log("createdUser: ", createdUser);
      }
    });
  }
};
