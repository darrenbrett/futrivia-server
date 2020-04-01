module.exports = (gameDetails) => {
  let i = 0;
  let homeTeamFirstHalfGoals = 0;
  let awayTeamFirstHalfGoals = 0;

  let timerId = setTimeout(function tick() {
    if (i == 0) console.log('Game is underway!');
    console.log(`${i++}'`);
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

    if (i == 45) {
      for (let hg of gameDetails.homeTeamGoalTimes) {
        if (hg < 45) {
          homeTeamFirstHalfGoals++;
        }
      }
      for (let ag of gameDetails.awayTeamGoalTimes) {
        if (ag < 45) {
          awayTeamFirstHalfGoals++;
        }
      }
      console.log('Half-time!');
      console.log(`Score is AWAY ${awayTeamFirstHalfGoals} to HOME ${homeTeamFirstHalfGoals}`);
    }

    if (i == 92) {
      console.log('End of game!');
      console.log(gameDetails);
      return;
    }
    timerId = setTimeout(tick, 2000);
  });



};
