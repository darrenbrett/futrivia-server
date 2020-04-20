const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  createdOn: {
    type: Date
  },
  smLogoUrl: {
    type: String
  },
  conference: {
    type: String
  },
  fullName: {
    type: String
  },
  roster: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "players"
  }],
  season: {
    wins: {
      type: Number
    },
    losses: {
      type: Number
    },
    ties: {
      type: Number
    },
    goalDiff: {
      type: Number
    },
    points: {
      type: Number
    }
  },
  lgLogoUrl: {
    type: String
  },
  coach: {
    type: String
  },
  firstSeason: {
    type: String
  },
  entryYear: {
    type: String
  },
  owner: {
    lastName: {
      type: String
    },
    firstName: {
      type: String
    }
  },
  name: {
    location: {
      type: String
    },
    nick: {
      type: String
    }
  },
  playersAggScore: {
    type: Number
  },
  teamScore: {
    type: Number
  }
});

module.exports = Team = mongoose.model("teams", TeamSchema);
