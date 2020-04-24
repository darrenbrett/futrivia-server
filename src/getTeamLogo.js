module.exports = getTeamLogo = async (team) => {
  let teamLogoUrl;
  const filter = {
    'name.location': team,
  };
  try {
    teamLogoUrl = await queryHandler.find('team', filter, {
      smLogoUrl: 1
    });
  } catch (error) {
    console.log(error);
  }
  return teamLogoUrl;
};
