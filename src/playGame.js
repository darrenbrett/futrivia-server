const playGame = require('./genScore');
const getScorersForGoals = require('./getScorersForGame');
const getTimesOfGoals = require('./getTimesOfGoals').getTimeForEachGoal;
const goalDetails = require('./getGoalTypes');
const wasPenaltyMissed = require('./missedPenaltyCheck');
const gamesCtlr = require('./../ctlrs/games');
const genTimer = require('./genTimer');
const updateTeamPoints = require('./stats/updateTeamPoints');
const updatePlayerGoals = require('./stats/updatePlayerGoals');
const getTeamLogo = require('./getTeamLogo');

const getGameResults = async function () {
  const seasonRound = "20-13";
  const round = 13;
  const awayTeam = "Argonia";
  const homeTeam = "Pieska";
  const score = await playGame.genScore(awayTeam, homeTeam);
  let goalsArr = score.split(":");
  let winner;

  const awayTeamLogoUrl = await getTeamLogo(awayTeam);
  const homeTeamLogoUrl = await getTeamLogo(homeTeam);

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

  if (awayTeamNumOfGoals > homeTeamNumOfGoals) {
    winner = awayTeam;
  } else if (awayTeamNumOfGoals < homeTeamNumOfGoals) {
    winner = homeTeam;
  }

  const gameDetails = {
    seasonRound,
    round,
    awayTeam,
    awayTeamLogoUrl,
    homeTeam,
    homeTeamLogoUrl,
    score,
    goalScorers,
    awayTeamNumOfGoals,
    awayTeamGoalTimes,
    awayTeamGoalTypes,
    homeTeamNumOfGoals,
    homeTeamGoalTimes,
    homeTeamGoalTypes,
    penaltyMissed,
    winner
  };

  await gamesCtlr.saveGame(gameDetails);
  await genTimer(gameDetails);
  await updateTeamPoints(gameDetails);
  await updatePlayerGoals(gameDetails);
};

getGameResults();
