'use strict';

const schedule = require("./genAllGames");

// console.log(schedule);

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// console.log(schedule.length);
const numberOfWeeks = schedule.length / 6;
console.log('number of weeks: ', numberOfWeeks);

let arr = schedule;
arr = shuffle(arr);
console.log('arr length: ', arr.length);

// let week1 = arr.slice(0, 6);

// console.log('week 1: ', week1);

// ----- Generate Weeks ------

let games = arr;
console.log('games length: ', games.length);

const gamesTaken = new Set();
const weekGames = [];
let gamesToPlay = [];
let playedGames = [];

for (const game of games) {
  if (weekGames.length >= 6) break;

  const [teamA, teamB] = game.split(" : ");
  if (gamesTaken.has(teamA) || gamesTaken.has(teamB)) continue;

  gamesTaken.add(teamA);
  gamesTaken.add(teamB);

  weekGames.push(game);
}

console.log('weekGames.length: ', weekGames.length);

console.log('games.length: ', games.length);

games = weekGames.filter(weekGame => {
  // console.log('game: ', game);
  games.includes(weekGame);
});

console.log('games.length: ', games.length);

// console.log('playedGames length: ', playedGames.length);
// console.log('gamesToPlay: ', playedGames);

// for (let weekGame of weekGames) {
//   console.log(games.length);
//   console.log('weekGame: ', weekGame);
//   let playedGames = games.filter(game => {
//     console.log('game checking...', game);
//     game.toString() === weekGame.toString();
//   });
//   console.log('gamesToPlay length: ', games.length);
// }
