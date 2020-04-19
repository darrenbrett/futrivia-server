const players = require('./data/rosters/agg-roster');

const injuredPlayer = players[Math.floor(Math.random() * players.length)];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const duration = getRandomIntInclusive(1, 10);

console.log(`${injuredPlayer} is out for ${duration} weeks with an injury.`);
