const queryHandler = require('./../../utils/queryHandler');

let targetRound = 9;

const getTargetGames = async () => {
  let games = [];
  const filter = {
    round: targetRound
  };
  try {
    games = await queryHandler.find('games', filter);
  } catch (error) {
    console.log('Error getting users for target games');
    console.log(error);
  }
  return games;
};

const getUsersWithPredictions = async () => {
  console.log('getUsersWithPredictions: ', getUsersWithPredictions);
  let users = [];
  const filter = {
    'predictions.0': {
      $exists: true
    }
  };
  try {
    users = await queryHandler.find('users', filter);
  } catch (error) {
    console.log('Error getting users for prediction results');
    console.log(error);
  }
  console.log('users:', users);
  return users;
};

const getGamesResults = async () => {
  let gameResults = [];
  const games = await getTargetGames();
  for (let g of games) {
    if (g.awayTeamNumOfGoals > g.homeTeamNumOfGoals) {
      gameResult = 'away';
    } else if (g.awayTeamNumOfGoals < g.homeTeamNumOfGoals) {
      gameResult = 'home';
    } else if (g.awayTeamNumOfGoals == g.homeTeamNumOfGoals) {
      gameResult = 'tie';
    }
    gameResults.push({
      result: gameResult
    });
  }
  console.log('gameResults: ', gameResults);
  return gameResults;
};

const updateUserPredictionScores = async () => {
  let users = await getUsersWithPredictions();
  const games = await getGamesResults();
  let matchCount = 0;
  for (let u of users) {
    for (let p of u.predictions) {
      if (p.round == targetRound) {
        let targetPredictions = p.predictions[0];
        console.log('targetPredictions: ', targetPredictions);
        for (let g of games) {
          for (let tp of targetPredictions) {
            if ((games.indexOf(g) === targetPredictions.indexOf(tp)) && (tp.choice == g.result)) {
              console.log('tp.choice: ', tp.choice, targetPredictions.indexOf(tp));
              console.log('g.result: ', g.result, games.indexOf(g));
              matchCount++;
            }
          }
        }
        console.log('u.predictionsScore: ', u.predictionsScore);
        console.log('matchCount: ', matchCount);
        const newTotalScore = u.predictionsScore + matchCount;
        console.log('newTotalScore: ', newTotalScore);
        try {
          await queryHandler.findOneAndUpdate("users", {
            _id: u._id
          }, {
            $set: {
              predictionsScore: newTotalScore
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};

updateUserPredictionScores();
