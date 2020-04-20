const queryHandler = require('./../utils/queryHandler');

const teams = [
  'Andessa',
  'Argonia',
  'Aventura',
  'Creighton',
  'Hawthorne',
  'Janders',
  'Larson',
  'Pieska',
  'Rosdan',
  'Sanviago',
  'Solstan',
  'Westingdon'
];

const getTeamPlayers = async (team) => {
  let players = [];
  const filter = {
    currentTeam: team
  };
  try {
    players = await queryHandler.find('players', filter);
  } catch (error) {
    console.log(error);
  }
  return players;
};

const genTeamRoster = async (team) => {
  let players = await getTeamPlayers(team);
  let playerIds = players.map(p => p._id);
  const filter = {
    'name.location': team
  };
  const updateOp = {
    $set: {
      roster: playerIds
    }
  };
  console.log(`Populating ${team} roster...`);
  await queryHandler.findOneAndUpdate('teams', filter, updateOp);
};

genTeamRosters = async () => {
  for (let team of teams) {
    await genTeamRoster(team);
  }
};

genTeamRosters();
