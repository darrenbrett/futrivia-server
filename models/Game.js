const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
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
