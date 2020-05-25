const Round = require('./../models/Round');
const queryHandler = require('./../utils/queryHandler');

// Get all rounds
exports.getAll = () => {
  try {
    return Round.find();
  } catch (error) {
    console.log('Error in rounds get function');
    console.log(error);
  }
};

// Get current round
exports.getCurrentRound = () => {
  try {
    return Round.find({
      current: true
    });
  } catch (error) {
    console.log('Error in get current round function');
    console.log(error);
  }
};

// Get round by filter
exports.getFilteredRound = (filter) => {
  try {
    return Round.find(filter);
  } catch (error) {
    console.log('Error in rounds ctlr get filtered round function');
    console.log(error);
  }
};
