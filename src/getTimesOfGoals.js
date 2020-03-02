function getGoalTime() {
  const min = Math.ceil(1);
  const max = Math.floor(90);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getTimeForEachGoal() {
  let goalTimes = [];
  let goals = 3;
  let i = 0;
  while (i < goals) {
    let timeOfGoal = getGoalTime();

    goalTimes.push(timeOfGoal);
    goalTimes.sort();
    i++;
  }
  console.log('goalTimes: ', goalTimes);
}

getTimeForEachGoal();

module.exports = getTimeForEachGoal;
