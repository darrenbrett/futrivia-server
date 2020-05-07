const Round = require('./../models/Round');
const Team = require('./../models/Team');
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

// Get team by location
exports.getCurrentRound = async () => {
  try {
    await this.getTeamLogos();
    return Round.findOne({
      current: true
    });
  } catch (error) {
    console.log('Error in teams ctlr getCurrentRound function');
    console.log(error);
  }
};

exports.getTeamLogos = async () => {
  let teamLogosArr = [];
  try {
    let teams = await queryHandler.find('teams');
    teamLogosArr = teams.map(({
      name,
      lgLogoUrl
    }) => ({
      name,
      lgLogoUrl
    }));
  } catch (error) {
    console.log(error);
  }
  return teamLogosArr;
};
