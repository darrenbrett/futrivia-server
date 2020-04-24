const queryHandler = require("./../utils/queryHandler");

const teams = ["Andessa", "Argonia", "Aventura", "Creighton", "Hawthorne", "Janders", "Larson", "Pieska", "Rosdan", "Sanviago", "Solstan", "Westingdon"];

const getTeamLogo = async (team) => {
  let teamLogo;
  const filter = {
    currentTeam: team,
  };
  try {
    teamLogo = await queryHandler.find("team", filter, {
      smLogoUrl: 1
    });
  } catch (error) {
    console.log(error);
  }
  return teamLogo;
};

const popAwayTeamLogo = async (team) => {
  let logo = await getTeamLogo(team);
  console.log("logo 20: ", logo);
  const filter = {
    awayTeam: team,
  };
  const updateOp = {
    $set: {
      awayTeamLogoUrl: logo,
    },
  };
  console.log(`Populating ${team} logo to games...`);
  await queryHandler.findOneAndUpdate("games", filter, updateOp);
};

const popHomeTeamLogo = async (team) => {
  let logo = await getTeamLogo(team);
  console.log("logo35: ", logo);
  const filter = {
    homeTeam: team,
  };
  const updateOp = {
    $set: {
      awayTeamLogoUrl: logo,
    },
  };
  console.log(`Populating ${team} logo to games...`);
  await queryHandler.findOneAndUpdate("games", filter, updateOp);
};

const genTeamLogos = async () => {
  for (let team of teams) {
    await popAwayTeamLogo(team);
    await popHomeTeamLogo(team);
  }
};

genTeamLogos();
