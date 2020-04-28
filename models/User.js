const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  type: {
    type: Number,
  },
  tokens: [],
  roles: [],
  predictions: [{
    year: {
      type: Number
    },
    round: {
      type: Number
    },
    predictions: [{

    }]
  }]
});

module.exports = User = mongoose.model("users", UserSchema);
