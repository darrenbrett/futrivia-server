const Team = require('./../models/Team');

// Get all teams
exports.getAll = () => {
  try {
    return Team.find();
  } catch (error) {
    console.log('Error in teams ctlr get function');
    console.log(error);
  }
};

// Get team by location
exports.getByLocation = (location) => {
  try {
    return Team.findOne({
      "name.location": location
    }).populate("roster", ["fullName", "position", "goals.year.2020"]);
  } catch (error) {
    console.log('Error in teams ctlr getByLocation function');
    console.log(error);
  }
};

// Get team small logos
exports.getTeamLogos = () => {
  try {
    return Team.find({}, {
      _id: 0,
      "name.location": 1,
      smLogoUrl: 1
    });
  } catch (error) {
    console.log('Error in getTeamLogos function');
  }
};
