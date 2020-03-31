const queryHandler = require("./../utils/queryHandler");

const getGame = async (filter) => {
  let game;
  try {
    player = await queryHandler.findOne("games", filter);
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

module.exports = {
  getGame,
  saveGame
};
