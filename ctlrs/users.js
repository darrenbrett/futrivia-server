const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verificationKey = require("./../configuration/authConfig");

// Get all users
exports.getAll = () => {
  try {
    return User.find();
  } catch (error) {
    console.log("Error in players get function");
    console.log(error);
  }
};

// Create a new user with hashed password
exports.create = async (username, password) => {
  const duplicateUsernameCheck = await User.findOne({
    username: username,
  });
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

// Login a user
exports.login = async (username, password) => {
  const userToCheck = await User.findOne({
    username: username,
  });
  if (!userToCheck) {
    const message = "Auth failed";
    return message;
  }
  const hashedPassword = userToCheck.password;
  const match = await bcrypt.compare(password, hashedPassword);
  if (match) {
    const token = jwt.sign({
        username: userToCheck.username
      },
      verificationKey, {
        expiresIn: 86400
      }
    );
    await userToCheck.tokens.push({
      token: token
    });
    userToCheck.save();
    return {
      user: userToCheck,
      token: token
    };
  } else {
    console.log("Passwords did not match!");
    const message = "Auth failed";
    return message;
  }
};

exports.savePredictions = async (userId, predictionObj) => {
  const user = await User.findOne({
    _id: userId,
  });
  await user.predictions.push(predictionObj);
  let updatedUser = await user.save();
  return updatedUser;
};
