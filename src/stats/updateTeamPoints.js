const queryHandler = require('./../../utils/queryHandler');

const updateAwayTeamPoints = async (awayTeam, awayTeamNumOfGoals, homeTeamNumOfGoals) => {
  let awayTeamDoc;
  try {
    awayTeamDoc = await queryHandler.findOne("pointTotals", {
      team: awayTeam
    });
  } catch (error) {
    console.log(error);
  }

  const awayGameGoalDiff = awayTeamNumOfGoals - homeTeamNumOfGoals;

  // Tie game result
  if (awayTeamNumOfGoals == homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("pointTotals", {
        team: awayTeam
      }, {
        $set: {
          ties: awayTeamDoc.ties + 1,
          points: awayTeamDoc.points + 1,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Away team win
  if (awayTeamNumOfGoals > homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("pointTotals", {
        team: awayTeam
      }, {
        $set: {
          wins: awayTeamDoc.wins + 1,
          goalDiff: awayTeamDoc.goalDiff + awayGameGoalDiff,
          points: awayTeamDoc.points + 3,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Away team loss
  if (awayTeamNumOfGoals < homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("pointTotals", {
        team: awayTeam
      }, {
        $set: {
          wins: awayTeamDoc.losses + 1,
          goalDiff: awayTeamDoc.goalDiff + awayGameGoalDiff
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
    homeTeamDoc = await queryHandler.findOne("pointTotals", {
      team: homeTeam.trim()
    });
  } catch (error) {
    console.log(error);
  }

  const homeGameGoalDiff = homeTeamNumOfGoals - awayTeamNumOfGoals;

  // Tie game result
  if (awayTeamNumOfGoals == homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("pointTotals", {
        team: homeTeam
      }, {
        $set: {
          ties: homeTeamDoc.ties + 1,
          points: homeTeamDoc.points + 1,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Home team win
  if (awayTeamNumOfGoals < homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("pointTotals", {
        team: homeTeam
      }, {
        $set: {
          wins: homeTeamDoc.wins + 1,
          goalDiff: homeTeamDoc.goalDiff + homeGameGoalDiff,
          points: homeTeamDoc.points + 3,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Home team loss
  if (awayTeamNumOfGoals > homeTeamNumOfGoals) {
    try {
      await queryHandler.findOneAndUpdate("pointTotals", {
        team: homeTeam
      }, {
        $set: {
          losses: homeTeamDoc.losses + 1,
          goalDiff: homeTeamDoc.goalDiff + homeGameGoalDiff
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
