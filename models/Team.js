const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  createdOn: {
    type: Date
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
