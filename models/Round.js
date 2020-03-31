const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoundSchema = new Schema({
  season: {
    type: Number
  },
  year: {
    type: Number
  },
  round: {
    type: Number
  },
  games: [{
    away: {
      type: String
    },
    home: {
      type: String
    }
  }]
});

module.exports = Round = mongoose.model("rounds", RoundSchema);
