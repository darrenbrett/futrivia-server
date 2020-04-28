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
  current: {
    type: Boolean
  },
  games: [{
    away: {
      type: String
    },
    awayLogo: {
      type: String
    },
    home: {
      type: String
    },
    homeLogo: {
      type: String
    },
  }]
});

module.exports = Round = mongoose.model("rounds", RoundSchema);
