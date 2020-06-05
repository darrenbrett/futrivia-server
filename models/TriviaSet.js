const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TriviaSetSchema = new Schema({
  category: {
    type: String
  },
  set: {
    type: Number
  },
  level: {
    type: Number
  },
  questions: [{
    qid: {
      type: Number
    },
    question: {
      type: String
    },
    choices: [{
      type: String
    }],
    answer: {
      type: String
    }
  }]
}, {
  versionKey: false
});

module.exports = TriviaSet = mongoose.model("triviaSets", TriviaSetSchema);
