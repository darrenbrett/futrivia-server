const queryHandler = require('./../utils/queryHandler');

module.exports = getTeamLogo = async (team) => {
  let teamDoc;
  let teamLogoUrl;
  const filter = {
    'name.location': team,
  };
  try {
    teamDoc = await queryHandler.findOne('teams', filter);
  } catch (error) {
    console.log(error);
  }

  teamLogoUrl = teamDoc.smLogoUrl;
  return teamLogoUrl;
};
