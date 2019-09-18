const fs = require("fs");

const easternConfTeams = require('./data/easternConfTeams');
const westernConfTeams = require('./data/westernConfTeams');

const zip = (a, b) => {
  return a.map((e, i) => [e, b[i]]);
};

const roundrobin = (teams) => {
  let mid = teams.length / 2;
  let rounds = [];
  for (let i = 0; i < teams.length - 1; i++) {
    let t = i ? [teams[0], ...teams.slice(-i), ...teams.slice(1, -i)] : teams;
    let t1 = t.slice(0, mid);
    let t2 = t.slice(mid).reverse();
    rounds.push(zip(t1, t2));
  }
  return rounds;
};

const combine = (a, b) => {
  return zip(a, b).map(e => [...e[0], ...e[1]]);
};

const alternate = (rounds, repeats) => {
  let alt = [];
  for (let i = 0; i < repeats; i++) {
    let next = i % 2 ? rounds.map(r => r.map(m => [m[1], m[0]])) : rounds;
    alt.push(...next);
  }
  return alt;
};

let schedule = [
  ...alternate(roundrobin([...easternConfTeams, ...westernConfTeams]), 2),
  ...alternate(combine(roundrobin(easternConfTeams), roundrobin(westernConfTeams)), 2)
];

console.log(schedule);

fs.writeFileSync('regularSeasonSchedule', schedule);
