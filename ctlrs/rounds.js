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
exports.getCurrentRound = async () => {
  console.log('getCurrentRound() firing...');
  try {
    const round = await queryHandler.findOne('rounds', {
      current: true
    });
    console.log('round: ', round);
    return round;
  } catch (error) {
    console.log('Error in teams ctlr getCurrentRound function');
    console.log(error);
  }
};

// Get round by filter
exports.getFilteredRound = async (filter) => {
  console.log('getCurrentRound() firing...');
  try {
    const round = await queryHandler.findOne('rounds', filter);
    console.log('filtered round: ', round);
    return round;
  } catch (error) {
    console.log('Error in teams ctlr get filtered round function');
    console.log(error);
  }
};

// exports.getTeamLogos = async () => {
//   let teamLogosArr = [];
//   try {
//     let teams = await queryHandler.find('teams');
//     teamLogosArr = teams.map(({
//       name,
//       lgLogoUrl
//     }) => ({
//       name,
//       lgLogoUrl
//     }));
//   } catch (error) {
//     console.log(error);
//   }
//   return teamLogosArr;
// };
