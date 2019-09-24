// generator player speed (6 - 10)
genSpeed = () => {
  const min = 6;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player ball handling ability
genBallHandling = () => {
  const min = 5;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player soccer smarts
genSoccerIntelligence = () => {
  const min = 6;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player strength
genStrength = () => {
  const min = 5;
  const max = 10
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player height
genHeight = () => {
  let initialHeight;
  let adjustedHeight;
  let finalHeight;
  const min = 54;
  const max = 66;
  initialHeight = Math.floor(Math.random() * (max - min + 1)) + min;
  if (initialHeight <= 56) {
    console.log('hit height threshold...');
    adjustedHeight = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    finalHeight = initialHeight + adjustedHeight;
    return finalHeight / 10;
  }
  finalHeight = initialHeight;
  return finalHeight / 10;
};

// generate mental fortitude
genMentalFortitude = () => {
  const min = 7;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate physicial fortitude
genPhysicalFortitude = () => {
  const min = 6;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

genProfileAverage = (speed, ballHandling, soccerIntelligence, strength, mentalFortitude, physicalFortitude) => {
  let score = speed + ballHandling + soccerIntelligence + strength + mentalFortitude + physicalFortitude;
  return score / 60 * 10;
};

genPlayerProfile = () => {
  const speed = genSpeed();
  const ballHandling = genBallHandling();
  const soccerIntelligence = genSoccerIntelligence();
  const strength = genStrength();
  const mentalFortitude = genMentalFortitude();
  const physicalFortitude = genPhysicalFortitude();
  const height = genHeight();

  let playerProfile = {
    speed,
    ballHandling,
    soccerIntelligence,
    strength,
    height,
    mentalFortitude,
    physicalFortitude
  };

  console.log(playerProfile);

  const playerAvgScore = genProfileAverage(speed, ballHandling, soccerIntelligence, strength, mentalFortitude, physicalFortitude);
  console.log('playerAvgScore: ', `${playerAvgScore}`);
};

genPlayerProfile();

module.exports = {
  genPlayerProfile
};
