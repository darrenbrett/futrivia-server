module.exports = (gameDetails) => {
  let i = 0;
  let timerId = setTimeout(function tick() {
    if (i == 0) console.log('Game is underway!');
    console.log(`${i++}'`);
    if (i == 45) console.log('Half-time!');
    for (let g of gameDetails.awayTeamGoalTimes) {
      if (i == g) {
        console.log(`Away goal in minute ${i}!`);
        let timeIdx = gameDetails.awayTeamGoalTimes.indexOf(g);
        for (let scorer of gameDetails.goalScorers.awayTeamScorers) {
          let scorerIdx = gameDetails.goalScorers.awayTeamScorers.indexOf(scorer);
          if (scorerIdx == timeIdx) {
            console.log('Scorer: ', scorer);
          }
        }
      }
    }
    for (let t of gameDetails.homeTeamGoalTimes) {
      if (i == t) {
        console.log(`Home goal in minute ${i}!`);
        let timeIdx = gameDetails.homeTeamGoalTimes.indexOf(t);
        for (let scorer of gameDetails.goalScorers.homeTeamScorers) {
          let scorerIdx = gameDetails.goalScorers.homeTeamScorers.indexOf(scorer);
          if (scorerIdx == timeIdx) {
            console.log('Scorer: ', scorer);
          }
        }
      }
    }
    if (i == 92) {
      console.log('End of game!');
      console.log(gameDetails);
      return;
    }
    timerId = setTimeout(tick, 2000); // (*)
  });



};
