const goalTypes = require("./data/stats/goal-types.json");

function getGoalType() {
  let result;
  const r = Math.random();
  if (r > 0 && r < 0.20) {
    result = 'glancing header';
  } if (r > 0 && r < 0.10) {
      result = 'bullet header';
  } if (r > 0.10 && r < 0.20) {
    result = 'near post curler';
  } if (r > 0.20 && r < 0.25) {
    result = 'far post curler';
  } if (r > 0.25 && r < 0.30) {
    result = 'deflection';
  } if (r > 0.30 && r < 0.40) {
    result = 'bumbler';
  } if (r > 0.40 && r < 0.45) {
    result = 'free kick';
  } if (r > 0.45 && r < 0.50) {
    result = 'breakaway';
  } if (r > 0.50 && r < 0.52) {
    result = 'bicycle kick';
  } if (r > 0.52 && r < 0.60) {
    result = 'own goal';
  } if (r > 0.60 && r < 0.65) {
    result = 'tap in';
  } if (r > 0.65 && r < 0.70) {
    result = 'near post laser';
  } if (r > 0.70 && r < 0.75) {
    result = 'far post laser';
  } if (r > 0.75 && r < 0.85) {
    result = "near post slotted";
  } if (r > 0.85 && r < 0.95) {
    result = "far post slotted";
  } if (r > 0.95 && r < 0.99) {
    result = "chip";
  }
  return result;
}

// function getGoalType() {
//   let result;
//   const r = Math.random();
//   if (r > 0 && r < 0.10) {
//     result = 'free kick';
//   } else if (r > 0.10 && r < 20){
//     result = 'curler';
//   } else if (r >)
//   return result;
// }

function getTypesForGoals(totalGoals) {
  if (totalGoals === 0) return;
  let scoredTypes = [];
  let i = 1;
  while (totalGoals >= i) {
    let goalType = getGoalType();
    scoredTypes.push(goalType);
    i++;
  }
  return scoredTypes;
}

module.exports =  {
  getTypesForGoals
};

