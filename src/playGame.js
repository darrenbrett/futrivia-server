const playGame = require('./genScore');
const getScorersForGoals = require('./getScorersForGame');
const getTimesOfGoals = require('./getTimesOfGoals').getTimeForEachGoal;
const goalDetails = require('./getGoalTypes');
const wasPenaltyMissed = require('./missedPenaltyCheck');
const gamesCtlr = require('./../ctlrs/games');

getGameResults = async function () {
  let awayTeam = "Janders";
  let homeTeam = "Westingdon";
  let score = await playGame.genScore(awayTeam, homeTeam);
  let goalsArr = score.split(":");
  awayTeam = goalsArr[0];
  awayTeam = awayTeam.substring(0, awayTeam.length - 3);
  homeTeam = goalsArr[1];
  homeTeam = homeTeam.substring(0, homeTeam.length - 2);

  const firstStr = goalsArr[0].trim();
  const awayTeamNumOfGoals = firstStr.charAt(firstStr.length - 1);

  const secondStr = goalsArr[1].trim();
  const homeTeamNumOfGoals = secondStr.charAt(secondStr.length - 1);

  let args = {
    awayTeam,
    awayTeamNumOfGoals,
    homeTeam,
    homeTeamNumOfGoals
  };

  const penaltyMissed = await wasPenaltyMissed();

  const goalScorers = await getScorersForGoals(args);

  const awayTeamGoalTimes = getTimesOfGoals(awayTeamNumOfGoals);
  const homeTeamGoalTimes = getTimesOfGoals(homeTeamNumOfGoals);

  const awayTeamGoalTypes = await goalDetails.getTypesForGoals(awayTeamNumOfGoals);
  const homeTeamGoalTypes = await goalDetails.getTypesForGoals(homeTeamNumOfGoals);

  const gameDetails = {
    score,
    goalScorers,
    awayTeamGoalTimes,
    awayTeamGoalTypes,
    homeTeamGoalTimes,
    homeTeamGoalTypes,
    penaltyMissed
  };

  console.log('gameDetails: ', gameDetails);
  await gamesCtlr.saveGame(gameDetails);
};

getGameResults();
