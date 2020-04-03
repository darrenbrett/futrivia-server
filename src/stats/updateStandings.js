const fs = require('fs');
const appRoot = require("app-root-path");

const queryHandler = require('./../../utils/queryHandler');

const getPointTotals = async () => {
  const teamPointTotals = await queryHandler.findTop('pointTotals');
  return teamPointTotals;
};

const getConferenceStandings = async () => {
  const teamPointTotals = await getPointTotals();
  const sortedEast = teamPointTotals.filter(t => t.conference === "Eastern").sort((a, b) => (a.points > b.points) ? -1 : 1);
  const sortedWest = teamPointTotals.filter(t => t.conference === "Western").sort((a, b) => (a.points > b.points) ? -1 : 1);

  console.log('sortedEast: ', sortedEast);
  console.log('sortedWest: ', sortedWest);

  try {
    const eastData = JSON.stringify(sortedEast);
    fs.writeFileSync(appRoot + '/src/data/standings/eastern-conference.json', eastData);
  } catch (error) {
    console.log(error);
  }

  try {
    const westData = JSON.stringify(sortedWest);
    fs.writeFileSync(appRoot + '/src/data/standings/western-conference.json', westData);
  } catch (error) {
    console.log(error);
  }

  return {
    sortedEast,
    sortedWest
  };

};

getConferenceStandings();

module.exports = getConferenceStandings;
