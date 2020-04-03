const queryHandler = require("./../utils/queryHandler");

const getGame = async (filter) => {
  let game;
  try {
    game = await queryHandler.findOne("games", filter);
    console.log("game: ", game);
  } catch (error) {
    console.log(error);
  }
  return game;
};

const saveGame = async (gameDetails) => {
  try {
    let savedGame = await queryHandler.insertOne("games", gameDetails);
    console.log('result: ', savedGame.result);
  } catch (error) {
    console.log('Error saving game details to database');
    console.log(error);
  }
};

const getGamesFromRound = async (seasonRound) => {
  let games = [];
  try {
    games = await queryHandler.find("games", {
      seasonRound: seasonRound
    });
  } catch (error) {
    console.log(error);
  }
  console.log("games: ", games);
  return games;
};

module.exports = {
  getGame,
  saveGame,
  getGamesFromRound
};
