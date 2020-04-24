const fs = require('fs');
const appRoot = require("app-root-path");

const queryHandler = require('./../../utils/queryHandler');

const getEasternPointTotals = async () => {
  const teamPointTotals = await queryHandler.findTop('pointTotals', {
    conference: "Eastern",
  }, {
    points: -1
  });
  console.log('teamPointTotals: ', teamPointTotals);
  return teamPointTotals;
};

getEasternPointTotals();

const getWesternPointTotals = async () => {
  const teamPointTotals = await queryHandler.findTop('pointTotals', {
    conference: "Western",
  }, {
    points: -1
  });
  console.log('teamPointTotals: ', teamPointTotals);
  return teamPointTotals;
};

getWesternPointTotals();

// const getConferenceStandings = async () => {
//   const teamPointTotals = await getPointTotals();
//   let sortedEast = teamPointTotals.filter(t => t.conference === "Eastern").sort((a, b) => (a.points > b.points) ? -1 : 1);
//   let sortedWest = teamPointTotals.filter(t => t.conference === "Western").sort((a, b) => (a.points > b.points) ? -1 : 1);

//   console.log('sortedEast: ', sortedEast);
//   console.log('sortedWest: ', sortedWest);

//   for (let t of sortedEast) {
//     for (let i of sortedEast) {
//       if (t.points == i.points && t.team != i.team) {
//         sortedEast = teamPointTotals.filter(t => t.conference === "Eastern").sort((a, b) => (a.goalDif > b.goalDif) ? -1 : 1);
//       }
//     }
//   }

//   for (let t of sortedWest) {
//     for (let i of sortedWest) {
//       if (t.points == i.points && t.team != i.team) {
//         sortedEast = teamPointTotals.filter(t => t.conference === "Western").sort((a, b) => (a.goalDif > b.goalDif) ? -1 : 1);
//       }
//     }
//   }

//   try {
//     for (let d of sortedEast) {
//       console.log('d east: ', d);
//       await queryHandler.insertOne('eastStandings', d);
//     }

//     const eastData = JSON.stringify(sortedEast);
//     fs.writeFileSync(appRoot + '/src/data/standings/eastern-conference.json', eastData);
//   } catch (error) {
//     console.log(error);
//   }

//   try {
//     for (let d of sortedWest) {
//       console.log('d west: ', d);
//       await queryHandler.insertOne('westStandings', d);
//     }

//     const westData = JSON.stringify(sortedWest);
//     fs.writeFileSync(appRoot + '/src/data/standings/western-conference.json', westData);
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     sortedEast,
//     sortedWest
//   };

// };

// getConferenceStandings();

module.exports = {
  getEasternPointTotals,
  // getConferenceStandings
};
