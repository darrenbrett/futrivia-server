const argoniaPlayers = require('./data/rosters/argonia-roster');
const andessaPlayers = require('./data/rosters/andessa-roster');
const creightonPlayers = require('./data/rosters/creighton-roster');
const larsonPlayers = require('./data/rosters/larson-roster');
const sanviagoPlayers = require('./data/rosters/sanviago-roster');
const solstanPlayers = require('./data/rosters/solstan-roster');
const jandersPlayers = require('./data/rosters/janders-roster');
const rosdanPlayers = require('./data/rosters/rosdan-roster');
const hawthornePlayers = require('./data/rosters/hawthorne-roster');
const pieskaPlayers = require('./data/rosters/pieska-roster');
const aventuraPlayers = require('./data/rosters/aventura-diablos');
const westingdonPlayers = require('./data/rosters/westingdon-roster');

let eligHomePlayers = [];
let eligAwayPlayers = [];
let awayTeamGoalScorers = [];
let homeTeamGoalScorers = [];

function getScorer(eligPlayers) {
  if (eligPlayers.length) {
    const scorer = eligPlayers[Math.floor(Math.random() * eligPlayers.length)];
    return scorer;
  }
}

async function getEligiblePlayers(team) {
  if (team === "Andessa") return andessaPlayers;
  if (team === "Argonia") return argoniaPlayers;
  if (team === "Creighton") return creightonPlayers;
  if (team === "Larson") return larsonPlayers;
  if (team === "Sanviago") return sanviagoPlayers;
  if (team === "Solstan") return solstanPlayers;
  if (team === "Janders") return jandersPlayers;
  if (team === "Hawthorne") return hawthornePlayers;
  if (team === "Rosdan") return rosdanPlayers;
  if (team === "Pieska") return pieskaPlayers;
  if (team === "Aventura") return aventuraPlayers;
  if (team === "Westingdon") return westingdonPlayers;
}

async function getAwayTeamScorers(args) {
  let awayTeamIterations = 0;
  eligAwayPlayers = await getEligiblePlayers(args.awayTeam);
  while (awayTeamIterations < args.awayTeamNumOfGoals) {
    let goalScorer = getScorer(eligAwayPlayers);
    awayTeamGoalScorers.push(goalScorer);
    awayTeamIterations = awayTeamIterations + 1;
  }
  return awayTeamGoalScorers;
}

async function getHomeTeamScorers(args) {
  let homeTeamIterations = 0;
  eligHomePlayers = await getEligiblePlayers(args.homeTeam);
  while (homeTeamIterations < args.homeTeamNumOfGoals) {
    let goalScorer = getScorer(eligHomePlayers);
    homeTeamGoalScorers.push(goalScorer);
    homeTeamIterations = homeTeamIterations + 1;
  }
  return homeTeamGoalScorers;
}

async function getScorersForGoals(args) {
  let awayTeamScorers = await getAwayTeamScorers(args);
  let homeTeamScorers = await getHomeTeamScorers(args);
  let goalScorers = {
    "awayTeamScorers": awayTeamScorers,
    "homeTeamScorers": homeTeamScorers
  };
  return goalScorers;
}

module.exports = getScorersForGoals;
