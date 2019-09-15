const easternConfTeams = require('./data/easternConfTeams');
const westernConfTeams = require('./data/westernConfTeams');

const teamPool = [...easternConfTeams, ...westernConfTeams];

let gamesPerTeam = (teamPool.length - 1) * 4 + (teamPool.length * 2);

let schedule = teamPool.reduce((a, v, i) => {
  for (let j = i + 1; j < teamPool.length; j++) {
    if (i < 6) {
      if (j < 6) {
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
      } else {
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
      }
    } else {
      if (j < 6) {
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
      } else {
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
        a.push(`${v} : ${teamPool[j]}`);
      }
    }
  }
  return a;
}, []);

for (let team of teamPool) {
  let b = schedule.filter(e => e.includes(team));
  console.log(`The ${team} have ${b.length} games`);
}


let creightonGames = schedule.slice(0, 32);

// console.log('creightonGames: ', creightonGames);

console.log('schedule.length: ', schedule.length);
let firstHalfSchedule = schedule.slice(0, 96);
console.log('firstHalfSchedule: ', firstHalfSchedule);

let secondHalfSchedule = schedule.slice(96, 192);
console.log('secondHalfSchedule: ', secondHalfSchedule);

console.log('totalGames: ', firstHalfSchedule.length + secondHalfSchedule.length);
