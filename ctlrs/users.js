const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../models/User");
const queryHandler = require("./../utils/queryHandler");

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
exports.create = async (email, password) => {
  let createdUser;
  const duplicateUsernameCheck = await User.findOne({
    username: email,
  });
  if (duplicateUsernameCheck) {
    const duplicateUsernameMessage = "duplicate";
    return duplicateUsernameMessage;
  } else if (!duplicateUsernameCheck) {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        const user = new User({
          username: email,
          password: hash,
          roles: ["standard"],
          predictionsScore: 0
        });
        createdUser = await user.save();
        console.log('createdUser: ', createdUser);
      }
    });
  }
};

// Login a user
exports.login = async (email, password) => {
  console.log('email: ', email);
  console.log('password: ', password);
  const userToCheck = await User.findOne({
    username: email,
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

exports.hasUserSubmittedRoundPredictions = async (userId, round) => {
  let currentRound;
  const user = await User.findOne({
    _id: userId,
  });
  for (let p of user.predictions) {
    if (p.round === round) {
      currentRound = p;
    }
  }
  if (!currentRound || !currentRound.completed || currentRound.completed === false) {
    return false;
  }
  if ((currentRound.completed === true)) {
    return true;
  } else {
    return false;
  }
};

exports.updateLastSetCompleted = async (username, lastCompletedSet) => {
  const user = await User.findOne({
    username: username,
  });
  user.lastCompletedSet = lastCompletedSet;
  let updatedUser = await user.save();
  return updatedUser;
};

// Get next trivia set for user
exports.getNextTriviaSet = async (username) => {
  const user = await User.findOne({
    username: username,
  });
  let nextTriviaSetNum = user.lastCompletedSet + 1;
  let nextTriviaSet;
  try {
    nextTriviaSet = await queryHandler.findOne("triviaSets", {
      set: nextTriviaSetNum
    });
  } catch (error) {
    console.log('Error getting next trivia set for user...');
    console.log(error);
  }
  return nextTriviaSet;
};
