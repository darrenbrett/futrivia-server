const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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
          predictionsScore: 0,
        });
        createdUser = await user.save();
        console.log("createdUser: ", createdUser);
      }
    });
  }
};

// Login a user
exports.login = async (email, password) => {
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
        username: userToCheck.username,
      },
      verificationKey, {
        expiresIn: 86400,
      }
    );
    await userToCheck.tokens.push({
      token: token,
    });
    userToCheck.save();
    return {
      user: userToCheck,
      token: token,
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

exports.runFeaturesCheck = (roundsCompleted) => {
  let feature;
  if (roundsCompleted === 3) {
    feature = "Multiple Categories";
  } else if (roundsCompleted === 6) {
    feature = "Scorcher";
  } else if (roundsCompleted === 10) {
    feature = "Earth Shaker";
  }
  return feature;
};

exports.updateStats = async (username, lastCompletedSet, pointsToAdd) => {
  const user = await User.findOne({
    username: username,
  });
  user.lastCompletedSet = lastCompletedSet;
  user.points = user.points + pointsToAdd;
  user.roundsCompleted = ++user.roundsCompleted;
  user.roundsRemaining = --user.roundsRemaining;
  user.lastScore = pointsToAdd;
  if (user.roundsCompleted > 2) {
    const featureToUnlock = await this.runFeaturesCheck(user.roundsCompleted);
    if (featureToUnlock && !user.featuresUnlocked.includes(featureToUnlock)) {
      await user.featuresUnlocked.push(featureToUnlock);
    }
  }
  const updatedUser = await user.save();
  return updatedUser;
};

exports.getUser = async (username) => {
  let user;
  try {
    user = await User.findOne({
      username: username,
    });
  } catch (error) {
    console.log("Error getting user...");
    console.log(error);
  }
  return user;
};

// Get next trivia set for user
exports.getNextTriviaSet = async (username, topic) => {
  const user = await User.findOne({
    username: username,
  });
  let nextTriviaSetNum = user.lastCompletedSet + 1;
  let nextTriviaSet;
  try {
    if (topic !== user.lastCompletedTopic) {
      nextTriviaSetNum = 1;
    }
    nextTriviaSet = await queryHandler.findOne("triviaSets", {
      set: nextTriviaSetNum,
      topic
    });
  } catch (error) {
    console.log("Error getting next trivia set for user...");
    console.log(error);
  }
  return nextTriviaSet;
};
