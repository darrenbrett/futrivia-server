const queryHandler = require("./../utils/queryHandler");
const Player = require('./../models/Player');

// Get all players
exports.getAll = () => {
  try {
    return Player.find();
  } catch (error) {
    console.log('Error in players get function');
    console.log(error);
  }
};

// Get players by team
exports.getPlayersPerTeam = (team) => {
  try {
    return Player.find({
      currentTeam: team
    });
  } catch (error) {
    console.log('Error in getTeamPlayers function');
    console.log(error);
  }
};

// Get players by position
exports.getPlayersByPosition = (position) => {
  try {
    return Player.find({
      position
    });
  } catch (error) {
    console.log('Error in getPlayersByPosition() function');
    console.log(error);
  }
};

// Get elite players - aggScore > 9
exports.getElitePlayers = () => {
  try {
    return Player.find({
      aggScore: {
        $gt: 9
      }
    }).sort({
      aggScore: -1
    });
  } catch (error) {
    console.log('Error in getElitePlayers() function');
    console.log(error);
  }
};

// Get players agg above
exports.getPlayersAggAbove = (num) => {
  try {
    return Player.find({
      aggScore: {
        $gt: parseFloat(num)
      }
    }).sort({
      aggScore: -1
    });
  } catch (error) {
    console.log('Error in getPlayersAggAbove()');
    console.log(error);
  }
};

// Get players agg below
exports.getPlayersAggBelow = (num) => {
  try {
    return Player.find({
      aggScore: {
        $lt: parseFloat(num)
      }
    }).sort({
      aggScore: -1
    });
  } catch (error) {
    console.log('Error in getPlayersAggAbove()');
    console.log(error);
  }
};







const getPremiumPlayers = async () => {
  let players = [];
  try {
    const filter = {
      aggScore: {
        $gt: 9
      }
    };
    players = await queryHandler.find("players", filter);
  } catch (error) {
    console.log(error);
  }
  let truncPlayers = players.map(({
    name,
    currentTeam,
    aggScore,
    position
  }) => ({
    name,
    currentTeam,
    aggScore,
    position
  }));
  console.log('AggScore > 9 Players: ', truncPlayers);
  return truncPlayers;
};

const getTop10 = async () => {
  let players = [];
  try {
    const filter = {
      aggScore: -1
    };
    players = await queryHandler.findTop("players", filter, 10);
  } catch (error) {
    console.log(error);
  }
  let truncPlayers = players.map(({
    name,
    aggScore,
    currentTeam
  }) => ({
    name,
    aggScore,
    currentTeam
  }));
  console.log("truncPlayers: ", truncPlayers);
  return truncPlayers;
};

const getPlayersPerTeam = async () => {
  let playersForTeam = [];
  try {
    const filter = {
      currentTeam: "Westingdon"
    };
    const sort = {
      aggScore: -1
    };
    playersForTeam = await queryHandler.find("players", filter, sort);
  } catch (error) {
    console.log(error);
  }
  let truncPlayers = playersForTeam.map(({
    name,
    currentTeam,
    aggScore,
    position
  }) => ({
    name,
    currentTeam,
    aggScore,
    position
  }));
  console.log("truncPlayers: ", truncPlayers);
  return truncPlayers;
};

// getPlayer();
// getPremiumPlayers();
// getTop10();
// getPlayersPerTeam();
