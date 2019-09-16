const schedule = require("./genAllGames");

// console.log(schedule);

shuffle = (array) => {
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

console.log(schedule.length);
const numberOfWeeks = schedule.length / 12;
console.log('number of weeks: ', numberOfWeeks);

let arr = schedule;
arr = shuffle(arr);
// console.log(arr);

let week1 = arr.slice(0, 6);

console.log('week 1: ', week1);
