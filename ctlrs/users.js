const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const User = require("./../models/User");
const queryHandler = require("./../utils/queryHandler");

const verificationKey = require("./../configuration/authConfig");

const TriviaSet = require("./../models/TriviaSet");
const Topic = require("./../models/Topic");

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

exports.resetUser = async (username) => {
  const user = await User.findOne({
    username: username,
  });
  for (let t of user.tokens) {
    if (user.tokens.length > 1) {
      user.tokens.pop();
    }
  }
  user.roundsCompleted = 0;
  user.points = 0;
  user.roundsRemaining = 10;
  user.bonusCompleted = 0;
  user.lastCompletedSet = 0;
  user.lastScore = 0;
  user.lastCompletedTopic = 'starter';
  user.featuresUnlocked = [];
  user.topics = [];
  let resetUser = await user.save();
  return resetUser;
};

exports.runFeaturesCheck = (roundsCompleted) => {
  let feature;
  if (roundsCompleted === 3) {
    feature = "Multiple Categories";
  } else if (roundsCompleted === 5) {
    feature = "Bonus Challenge";
  } else if (roundsCompleted === 10) {
    feature = "Earth Shaker";
  }
  return feature;
};

exports.addRookieTopicsToUser = async (user) => {
  const newTopics = await queryHandler.find('topics');
  let userTopics = user.topics;
  for (let topic of newTopics) {
    topic.setsCompleted = 0;
    topic.setsRemaining = 3;
    if (topic.level === 1) {
      await userTopics.push(topic);
    }
  }
  return userTopics;
};

exports.userTopicsUpdate = async (user, lastCompletedSet, lastCompletedTopic) => {
  if (user.topics.length < 1) {
    user.topics.push({
      topic: lastCompletedTopic,
      setsCompleted: 1,
      setsRemaining: 2
    });
    return user.topics;
  }
  if (lastCompletedSet === 3) {
    user.topics = await this.addRookieTopicsToUser(user, lastCompletedSet);
    return user.topics;
  }
  if (lastCompletedSet < 3 || lastCompletedSet > 3) {
    for (let t of user.topics) {
      if (t.topic === lastCompletedTopic) {
        t.setsCompleted = ++t.setsCompleted;
        t.setsRemaining = --t.setsRemaining;
      }
    }
    return user.topics;
  }
};

exports.updateStats = async (username, lastCompletedSet, lastCompletedTopic, pointsToAdd) => {
  const user = await User.findOne({
    username: username,
  });
  user.lastCompletedSet = lastCompletedSet;
  user.lastCompletedTopic = lastCompletedTopic;
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
  user.topics = await this.userTopicsUpdate(user, lastCompletedSet, lastCompletedTopic);
  const updatedUser = await user.save();
  return updatedUser;
};

exports.updateBonusStats = async (username, result) => {
  const user = await User.findOne({
    username: username,
  });
  user.bonusCompleted = true;
  if (result === 'correct') {
    user.points += 10;
  } else if (result === 'incorrect') {
    user.points -= 5;
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
  console.log('nextTriviaSetNum: ', nextTriviaSetNum);
  let nextTriviaSet;
  try {
    if (topic !== user.lastCompletedTopic) {
      console.log('topic: ', topic);
      console.log('user.lastCompletedTopic: ', user.lastCompletedTopic);
      nextTriviaSetNum = 1;
      console.log('nextTriviaSetNum 159: ', nextTriviaSetNum);
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

// Get next bonus question for user
exports.getNextBonusQuestion = async (username) => {
  const user = await User.findOne({
    username: username,
  });
  let userLevel = user.level;
  let nextBonusQuestion;
  try {
    nextBonusQuestion = await queryHandler.findOne("bonusQuestions", {
      level: userLevel
    });
  } catch (error) {
    console.log("Error getting next bonus question for user...");
    console.log(error);
  }
  return nextBonusQuestion;
};

exports.getStandingsPerLevel = async (username) => {
  const user = await User.findOne({
    username: username,
  });
  // Get ranked users
  const userLevel = user.level;
  let rankedLevelUsers;
  await User.find({
      level: userLevel
    })
    .sort({
      "points": -1,
    })
    .then((users) => {
      rankedLevelUsers = users;
    })
    .catch((err) => {
      console.log("Error getting ranked users...");
      console.log(err);
    });
  return rankedLevelUsers;
};