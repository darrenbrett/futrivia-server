function getGoalTime() {
  const min = Math.ceil(1);
  const max = Math.floor(90);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function getTimeForEachGoal(totalGoals) {
  if (totalGoals === 0) return;
  let goalTimes = [];
  let i = 0;
  while (i < totalGoals) {
    let timeOfGoal = getGoalTime();
    goalTimes.push(timeOfGoal);
    goalTimes.sort();
    i++;
  }
  return goalTimes;
}

getTimeForEachGoal();

module.exports = getTimeForEachGoal;
