"use strict";

const fs = require('fs');
const appRoot = require("app-root-path");

module.exports = async function writeGameResult(gameDetails) {
  try {
    const gameData = JSON.stringify(gameDetails);
    fs.writeFileSync(appRoot + '/src/data/game-results/game-details.json', gameData);
  } catch (error) {
    console.log(error);
  }
};
