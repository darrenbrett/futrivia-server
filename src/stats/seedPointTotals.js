const queryHandler = require('./../../utils/queryHandler');

const pointTotals = [{
    team: "Argonia",
    conference: "Eastern",
    wins: 3,
    losses: 1,
    ties: 0,
    goalDiff: 5,
    points: 9
  },
  {
    team: "Creighton",
    conference: "Eastern",
    wins: 3,
    losses: 1,
    ties: 0,
    goalDiff: 4,
    points: 9
  },
  {
    team: "Larson",
    conference: "Eastern",
    wins: 2,
    losses: 1,
    ties: 1,
    goalDiff: 2,
    points: 7
  },
  {
    team: "Hawthorne",
    conference: "Eastern",
    wins: 1,
    losses: 1,
    ties: 2,
    goalDiff: 4,
    points: 5
  },
  {
    team: "Janders",
    conference: "Eastern",
    wins: 1,
    losses: 2,
    ties: 1,
    goalDiff: -1,
    points: 4
  },
  {
    team: "Pieska",
    conference: "Eastern",
    wins: 0,
    losses: 4,
    ties: 0,
    goalDiff: -11,
    points: 0
  },
  {
    team: "Aventura",
    conference: "Western",
    wins: 2,
    losses: 2,
    ties: 2,
    goalDiff: 4,
    points: 8
  },
  {
    team: "Westingdon",
    conference: "Western",
    wins: 2,
    losses: 1,
    ties: 1,
    goalDiff: 0,
    points: 7
  },
  {
    team: "Rosdan",
    conference: "Western",
    wins: 2,
    losses: 2,
    ties: 0,
    goalDiff: -3,
    points: 6
  },
  {
    team: "Andessa",
    conference: "Western",
    wins: 1,
    losses: 2,
    ties: 1,
    goalDiff: 1,
    points: 4
  },
  {
    team: "Sanviago",
    conference: "Western",
    wins: 1,
    losses: 2,
    ties: 1,
    goalDiff: -1,
    points: 4
  },
  {
    team: "Solstan",
    conference: "Western",
    wins: 1,
    losses: 2,
    ties: 1,
    goalDiff: -4,
    points: 4
  },
];

const populatePointTotals = async () => {
  for (let t of pointTotals) {
    const result = await queryHandler.insertOne('pointTotals', t);
    console.log('result: ', result.ops);
  }
};

populatePointTotals();
