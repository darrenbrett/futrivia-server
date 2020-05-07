const queryHandler = require('./../../utils/queryHandler');

const updateAwayTeamPoints = async (awayTeam, awayTeamNumOfGoals, homeTeamNumOfGoals) => {
  let awayTeamDoc;
  try {
    awayTeamDoc = await queryHandler.findOne("teams", {
      'name.location': awayTeam
    });
  } catch (error) {
    console.log(error);
  }

  const awayGameGoalDiff = awayTeamNumOfGoals - homeTeamNumOfGoals;

  // Tie game result
  if (awayTeamNumOfGoals == homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("teams", {
        _id: awayTeamDoc._id
      }, {
        $set: {
          'season.ties': awayTeamDoc.season.ties + 1,
          'season.points': awayTeamDoc.season.points + 1,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Away team win
  if (awayTeamNumOfGoals > homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("teams", {
        _id: awayTeamDoc._id
      }, {
        $set: {
          'season.wins': awayTeamDoc.season.wins + 1,
          'season.goalDiff': awayTeamDoc.season.goalDiff + awayGameGoalDiff,
          'season.points': awayTeamDoc.season.points + 3,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Away team loss
  if (awayTeamNumOfGoals < homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("teams", {
        _id: awayTeamDoc._id
      }, {
        $set: {
          'season.losses': awayTeamDoc.season.losses + 1,
          'season.goalDiff': awayTeamDoc.season.goalDiff + awayGameGoalDiff
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return;
};

const updateHomeTeamPoints = async (homeTeam, awayTeamNumOfGoals, homeTeamNumOfGoals) => {
  let homeTeamDoc;
  try {
    homeTeamDoc = await queryHandler.findOne("teams", {
      "name.location": homeTeam
    });
  } catch (error) {
    console.log(error);
  }

  const homeGameGoalDiff = homeTeamNumOfGoals - awayTeamNumOfGoals;

  // Tie game result
  if (awayTeamNumOfGoals == homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("teams", {
        _id: homeTeamDoc._id
      }, {
        $set: {
          'season.ties': homeTeamDoc.season.ties + 1,
          'season.points': homeTeamDoc.season.points + 1,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Home team win
  if (awayTeamNumOfGoals < homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("teams", {
        _id: homeTeamDoc._id
      }, {
        $set: {
          'season.wins': homeTeamDoc.season.wins + 1,
          'season.goalDiff': homeTeamDoc.season.goalDiff + homeGameGoalDiff,
          'season.points': homeTeamDoc.season.points + 3,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Home team loss
  if (awayTeamNumOfGoals > homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("teams", {
        _id: homeTeamDoc._id
      }, {
        $set: {
          'season.losses': homeTeamDoc.season.losses + 1,
          'season.goalDiff': homeTeamDoc.season.goalDiff + homeGameGoalDiff
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return;
};

module.exports = async (data) => {
  await updateAwayTeamPoints(data.awayTeam, data.awayTeamNumOfGoals, data.homeTeamNumOfGoals);
  await updateHomeTeamPoints(data.homeTeam, data.awayTeamNumOfGoals, data.homeTeamNumOfGoals);
};
