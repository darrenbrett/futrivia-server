const queryHandler = require('./../../utils/queryHandler');

const updatePlayerGoals = async (gameDetails) => {
  let goalScorers = gameDetails.goalScorers.awayTeamScorers.concat(gameDetails.goalScorers.homeTeamScorers);

  for (let gs of goalScorers) {
    let playerDoc;
    try {
      playerDoc = await queryHandler.findOne("players", {
        fullName: gs
      });
    } catch (error) {
      console.log(error);
    }

    let goalsScored = playerDoc.goals.year['2020'];
    const updatedGoalsScored = goalsScored + 1;

    try {
      await queryHandler.findOneAndUpdate("players", {
        fullName: gs
      }, {
        $set: {
          "goals.year.2020": updatedGoalsScored
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = updatePlayerGoals;
