const queryHandler = require("./../utils/queryHandler");

const getPlayer = async (filter) => {
  let player;
  try {
    player = await queryHandler.findOne("players", filter);
    console.log("player: ", player);
  } catch (error) {
    console.log(error);
  }
  return player;
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
getPremiumPlayers();
// getTop10();
// getPlayersPerTeam();
