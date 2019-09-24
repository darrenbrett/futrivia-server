// "use strict";

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
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate player height and weight
genHeightAndWeight = () => {
  let initialHeight;
  let height;
  let weight;
  const min = 56;
  const max = 65;
  initialHeight = Math.floor(Math.random() * (max - min + 1)) + min;
  // TODO: Add some variability above and below for outliers
  height = initialHeight;
  weight = height * 31 / 10;
  height = height / 10;

  return {
    height,
    weight
  };
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
  const heightAndWeight = genHeightAndWeight();

  let playerProfile = {
    speed,
    ballHandling,
    soccerIntelligence,
    strength,
    heightAndWeight,
    mentalFortitude,
    physicalFortitude
  };

  console.log(playerProfile);

  let playerAvgScore;
  let roundedAvgScore;

  playerAvgScore = genProfileAverage(speed, ballHandling, soccerIntelligence, strength, mentalFortitude, physicalFortitude);
  roundedAvgScore = playerAvgScore.toFixed(2);

  console.log('playerAvgScore: ', `${roundedAvgScore}`);
};

genPlayerProfile();

module.exports = {
  genPlayerProfile
};
