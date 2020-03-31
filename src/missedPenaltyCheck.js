module.exports = async () => {
  let result;
  let team;
  const r = Math.random();
  if (r > 0 && r <= 0.75) {
    result = 'no missed penalty';
  } else {
    let attemptTime = getAttemptTime();
    const t = Math.random();
    if (t < 0.50) team = 'home';
    else team = 'away';
    result = {
      'result': 'saved',
      'attemptTime': attemptTime,
      'team': team
    };
  }
  return result;
};

function getAttemptTime() {
  const min = Math.ceil(1);
  const max = Math.floor(90);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}
