const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  speed: {
    type: Number
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
  formerTeams: [
    {
      type: String
    }
  ],
  active: {
    type: Boolean
  },
  position: {
    type: String
  },
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  }
});

module.exports = Player = mongoose.model("players", PlayerSchema);
