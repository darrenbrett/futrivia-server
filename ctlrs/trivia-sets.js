const queryHandler = require("./../utils/queryHandler");
const TriviaSet = require('./../models/TriviaSet');

// // Get all trivia-sets
// exports.getAll = () => {
//   let triviaSets = [];
//   try {
//     return TriviaSet.find();
//   } catch (error) {
//     console.log('Error in trivia-sets ctlr get function');
//     console.log(error);
//   }
//   return triviaSets;
// };

// Get all trivia sets
exports.getAll = async () => {
  let triviaSets;
  try {
    triviaSets = await queryHandler.find("triviaSets");
  } catch (error) {
    console.log(error);
  }
  return triviaSets;
};

// Get user by id
exports.getUserById = async (username) => {
  console.log('username: ', username);
  console.log(typeof userId);
  let user;
  const filter = {
    username: username
  };
  try {
    user = await queryHandler.findOne("users", filter);
  } catch (error) {
    console.log('Error getting user...');
    console.log(error);
  }
  return user;
};

// Get next trivia set for user
exports.getNextTriviaSet = async (username) => {
  const user = await this.getUserById(username);
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
