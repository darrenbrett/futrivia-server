const queryHandler = require('./../../utils/queryHandler');

const updateAwayTeamPoints = async (awayTeam, awayTeamNumOfGoals, homeTeamNumOfGoals) => {
  let awayTeamDoc;
  try {
    awayTeamDoc = await queryHandler.findOne("teams", {
      "name.location": awayTeam
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
          ties: awayTeamDoc.season.ties + 1,
          points: awayTeamDoc.season.points + 1,
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
          wins: awayTeamDoc.season.wins + 1,
          goalDiff: awayTeamDoc.season.goalDiff + awayGameGoalDiff,
          points: awayTeamDoc.season.points + 3,
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
          wins: awayTeamDoc.season.losses + 1,
          goalDiff: awayTeamDoc.season.goalDiff + awayGameGoalDiff
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
          ties: homeTeamDoc.season.ties + 1,
          points: homeTeamDoc.season.points + 1,
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
          wins: homeTeamDoc.season.wins + 1,
          goalDiff: homeTeamDoc.season.goalDiff + homeGameGoalDiff,
          points: homeTeamDoc.season.points + 3,
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
          losses: homeTeamDoc.season.losses + 1,
          goalDiff: homeTeamDoc.season.goalDiff + homeGameGoalDiff
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
