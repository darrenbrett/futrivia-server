const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  seasonRound: {
    type: String
  },
  score: {
    type: String
  },
  goalScorers: {
    awayTeamScorers: [{
      type: String
    }],
    homeTeamScorers: [{
      type: String
    }]
  },
  awayTeam: {
    type: String
  },
  awayTeamLogoUrl: {
    type: String
  },
  homeTeam: {
    type: String
  },
  homeTeamLogoUrl: {
    type: String
  },
  awayTeamGoalTimes: [{
    type: Number
  }],
  awayTeamGoalTypes: [{
    type: String
  }],
  homeTeamGoalTimes: [{
    type: Number
  }],
  homeTeamGoalTypes: [{
    type: String
  }],
  penaltyMissed: {
    type: Object
  }
});

module.exports = Game = mongoose.model("games", GameSchema);
