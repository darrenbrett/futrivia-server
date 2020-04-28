const Round = require('./../models/Round');

// Get all rounds
exports.getAll = () => {
  try {
    return Round.find();
  } catch (error) {
    console.log('Error in rounds get function');
    console.log(error);
  }
};

// Get team by location
exports.getCurrentRound = () => {
  try {
    return Round.findOne({
      current: true
    });
  } catch (error) {
    console.log('Error in teams ctlr getCurrentRound function');
    console.log(error);
  }
};
