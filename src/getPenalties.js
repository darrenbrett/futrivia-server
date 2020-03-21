"use strict";

function getPenaltiesResult(whichGoal) {
  let penaltyAwarded = wasPenaltyAwarded();
  if (penaltyAwarded === false) {
    return;
  }
  if (penaltyAwarded === true) {
    let result = getPenaltyResult(whichGoal);
    return result;
  }
}

function wasPenaltyAwarded() {
  let penalty = false;
  const g = Math.random();
  if (g < 0.25) {
    penalty = true;
  }
  return penalty;
}

function getPenaltyResult(whichGoal) {
  let result;
  const r = Math.random();
  if (r < 0.77) {
    result = { 'goal' : whichGoal };
  } else {
    result = 'save';
  }
  return result;
}

module.exports = getPenaltiesResult;



