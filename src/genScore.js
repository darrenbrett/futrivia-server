'use strict';

const teamStrengths = require("./data/teamStrengths.json");

function getGoalsScored() {
  let min = Math.ceil(0);
  // max = Math.floor(2);
  let max = 1.5;
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function getHomeXFactor() {
  let min = Math.ceil(0);
  let max = Math.floor(10);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

let homeTeamRating = 0;
let awayTeamRating = 0;

const genScore = async function (awayTeam, homeTeam) {
  // loop through and get homeTeam and awayTeam ratings
  for (let teamStrength of teamStrengths) {
    if (teamStrength.name === homeTeam) {
      homeTeamRating = teamStrength.rating;
      // console.log("home strength: ", homeTeam, homeTeamRating);
    }
    if (teamStrength.name === awayTeam) {
      awayTeamRating = teamStrength.rating;
      // console.log("away strength: ", awayTeam, awayTeamRating);
    }
  }

  // Get initial home team goals
  let homeTeamInitResult = getGoalsScored();
  // console.log('homeTeamInitResult: ', homeTeamInitResult);

  // Add in home field advantage
  homeTeamInitResult = homeTeamInitResult + 0.35;
  // console.log('homeTeamInitResult after advantage added: ', homeTeamInitResult);

  // Get intial away team goals
  let awayTeamInitResult = getGoalsScored();
  // console.log('awayTeamResult: ', awayTeamInitResult);

  // Calculate mod by strength rating
  let homeResultModByStrength = (homeTeamInitResult * homeTeamRating * 0.7) / 10;
  let awayResultModByStrength = (awayTeamInitResult * awayTeamRating * 0.7) / 10;

  // Calculate scores moderated by strength
  let awayModScore = awayTeamInitResult + awayResultModByStrength;
  // console.log("awayModScore: ", awayModScore);
  let homeModScore = homeTeamInitResult + homeResultModByStrength;
  // console.log("homeModScore: ", homeModScore);

  // Round scores to nearest integer
  let finalHomeScore = Math.round(homeModScore);
  let finalAwayScore = Math.round(awayModScore);

  let homeXFactor = getHomeXFactor();
  if (homeXFactor >= 9) {
    finalHomeScore = finalHomeScore + 1;
  } else if (homeXFactor > 10) {
    finalHomeScore = finalHomeScore + 2;
  } else if (homeXFactor == 7) {
    finalHomeScore = 0;
  }

  // Add in x factors for both teams to gen 0 - 0 scores
  let awayXFactor = getHomeXFactor();
  if (awayXFactor >= 9) {
    finalAwayScore = finalAwayScore + 1;
  }
  if (awayXFactor >= 10) {
    finalAwayScore = finalAwayScore + 2;
  } else if (awayXFactor == 7) {
    finalAwayScore = 0;
  }
  // console.log(`${awayTeam} ${finalAwayScore}`);
  // console.log(`${homeTeam} ${finalHomeScore}`);

  return `${awayTeam} ${finalAwayScore} : ${homeTeam} ${finalHomeScore}`;
};

module.exports = {
  genScore
};
