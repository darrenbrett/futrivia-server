const schedule = require("./genAllGames");

let totalGames = schedule;

genTeamGames = (team) => {
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
