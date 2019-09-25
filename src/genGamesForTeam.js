'use strict';

const schedule = require("./genAllGames");

let totalGames = schedule;

const genTeamGames = (team) => {
  let teamGamesArray = [];
  for (let game of totalGames) {
    if (game.includes(team)) {
      teamGamesArray.push(game);
    }
  }
  console.log(teamGamesArray);
  console.log(teamGamesArray.length);
};

genTeamGames("Sanviago");
