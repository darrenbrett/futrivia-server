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

module.exports = {
  getEasternPointTotals,
  getWesternPointTotals
};
