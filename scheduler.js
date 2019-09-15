let g1 = ['Westingdon Kodiacs', 'Aventura Diablos', 'Rosdan Redtails', 'Solstan Solars', 'Andessa Vanguard', 'Sanviago Power'];
let g2 = ['Creighton Fieldhawks', 'Larson Summiteers', 'Janders Brigade', 'Hawthorne Harriers', 'Pieska Pikes', 'Argonia Specters'];
let teamPool = [...g1, ...g2];

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
  // console.log(`team ${team} has ${b.length} games`);
  // console.log('teamPool: ', teamPool);
  // console.log('team: ', team);
  console.log('schedule: ', schedule);
  // console.log('schedule.length: ', schedule.length);
}

// console.log('teamPool: ', teamPool);

// let week1 = schedule[0];
// console.log('Week 1: ', week1);

// let week2 = schedule[1];
// console.log('Week 2: ', week2);
