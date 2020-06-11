const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  tokens: [],
  roles: [],
  featuresUnlocked: [{
    type: String
  }],
  lastCompletedSet: {
    type: Number,
    default: 0
  },
  lastCompletedTopic: {
    type: String,
    default: 'starter'
  },
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    default: 'rookie'
  },
  roundsCompleted: {
    type: Number,
    default: 0
  },
  roundsRemaining: {
    type: Number,
    default: 0,
  },
  lastScore: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false
});

module.exports = User = mongoose.model("users", UserSchema);
