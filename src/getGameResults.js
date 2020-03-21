const playGame = require('./genScore');
const getScorersForGoals = require('./getScorersForGame');
const getTimesOfGoals = require('./getTimesOfGoals');
const goalDetails = require('./getGoalTypes');

getGameResults = async function() {
  let awayTeam = "Andessa";
  let homeTeam = "Argonia";
  let score = await playGame.genScore(awayTeam, homeTeam);
  console.log('---------------------------------------------------');
  console.log('SCORE: ', score);
  console.log('---------------------------------------------------');
  let goalsArr = score.split(":");
  awayTeam = goalsArr[0];
  awayTeam = awayTeam.substring(0, awayTeam.length - 3);
  homeTeam = goalsArr[1];
  homeTeam = homeTeam.substring(0, homeTeam.length - 2);

  const firstStr = goalsArr[0].trim();
  const awayTeamNumOfGoals = firstStr.charAt(firstStr.length-1);

  const secondStr = goalsArr[1].trim();
  const homeTeamNumOfGoals = secondStr.charAt(secondStr.length-1);

  let args = {
    awayTeam,
    awayTeamNumOfGoals,
    homeTeam,
    homeTeamNumOfGoals
  };

  getScorersForGoals(args);
  const awayTeamGoalTimes = getTimesOfGoals(awayTeamNumOfGoals);
  const homeTeamGoalTimes = getTimesOfGoals(homeTeamNumOfGoals);

  const awayTeamGoalTypes = await goalDetails.getTypesForGoals (awayTeamNumOfGoals);
  const homeTeamGoalTypes = await goalDetails.getTypesForGoals(homeTeamNumOfGoals);

  console.log('awayTeamGoalTimes: ', awayTeamGoalTimes);
  console.log('awayTeamGoalTypes: ', awayTeamGoalTypes);
  console.log('---------------------------------------------------');
  console.log('homeTeamGoalTimes: ', homeTeamGoalTimes);
  console.log('homeTeamGoalTypes: ', homeTeamGoalTypes);
};

getGameResults();

