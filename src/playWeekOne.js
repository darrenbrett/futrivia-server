const playGame = require('./genScore');

const playGames = function() {
  console.log('--------------------');
  playGame.genScore("Creighton Fieldhawks", "Sanviago Power");
  console.log('--------------------');
  playGame.genScore("Larson Summiteers", "Andessa Vanguard");
  console.log('--------------------');
  playGame.genScore("Janders Brigade", "Solstan Solars");
  console.log('--------------------');
  playGame.genScore("Hawthorne Harriers", "Rosdan Redtails");
  console.log('--------------------');
  playGame.genScore("Pieska Pikes", "Aventura Diablos");
  console.log('--------------------');
  playGame.genScore("Argonia Specters", "Westingdon Kodiacs");
  console.log('--------------------');
};

playGames();
