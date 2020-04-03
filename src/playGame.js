const playGame = require('./genScore');
const getScorersForGoals = require('./getScorersForGame');
const getTimesOfGoals = require('./getTimesOfGoals').getTimeForEachGoal;
const goalDetails = require('./getGoalTypes');
const wasPenaltyMissed = require('./missedPenaltyCheck');
const gamesCtlr = require('./../ctlrs/games');
const genTimer = require('./genTimer');
const updateTeamPoints = require('./stats/updateTeamPoints');

getGameResults = async function () {
  let awayTeamName = "Janders";
  let homeTeamName = "Westingdon";
  let score = await playGame.genScore(awayTeamName, homeTeamName);
  let goalsArr = score.split(":");
  awayTeam = goalsArr[0];
  awayTeam = awayTeam.substring(0, awayTeam.length - 3);
  homeTeam = goalsArr[1];
  homeTeam = homeTeam.substring(0, homeTeam.length - 2);

  const firstStr = goalsArr[0].trim();
  const awayTeamNumOfGoals = firstStr.charAt(firstStr.length - 1);

  const secondStr = goalsArr[1].trim();
  const homeTeamNumOfGoals = secondStr.charAt(secondStr.length - 1);

  let goalArgs = {
    awayTeam,
    awayTeamNumOfGoals,
    homeTeam,
    homeTeamNumOfGoals
  };

  const penaltyMissed = await wasPenaltyMissed();

  const goalScorers = await getScorersForGoals(goalArgs);

  const awayTeamGoalTimes = await getTimesOfGoals(awayTeamNumOfGoals);
  const homeTeamGoalTimes = await getTimesOfGoals(homeTeamNumOfGoals);

  const awayTeamGoalTypes = await goalDetails.getTypesForGoals(awayTeamNumOfGoals);
  const homeTeamGoalTypes = await goalDetails.getTypesForGoals(homeTeamNumOfGoals);

  const gameDetails = {
    awayTeam,
    homeTeam,
    score,
    goalScorers,
    awayTeamNumOfGoals,
    awayTeamGoalTimes,
    awayTeamGoalTypes,
    homeTeamNumOfGoals,
    homeTeamGoalTimes,
    homeTeamGoalTypes,
    penaltyMissed
  };

  await gamesCtlr.saveGame(gameDetails);
  await genTimer(gameDetails);
  await updateTeamPoints(gameDetails);

};

getGameResults();
