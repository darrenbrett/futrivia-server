const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  fullName: {
    type: String
  },
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  },
  speed: {
    type: Number
  },
  goals: {
    year: {
      2020: {
        type: Number,
        default: 0
      }
    }
  },
  age: {
    type: Number
  },
  ballHandling: {
    type: Number
  },
  soccerIntelligence: {
    type: Number
  },
  strength: {
    type: Number
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  mentalFortitude: {
    type: Number
  },
  aggScore: {
    type: Number
  },
  currentTeam: {
    type: String
  },
  formerTeams: [{
    type: String
  }],
  active: {
    type: Boolean
  },
  position: {
    type: String
  }
});

module.exports = Player = mongoose.model("players", PlayerSchema);
