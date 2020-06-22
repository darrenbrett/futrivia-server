const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  topic: {
    type: String
  },
  level: {
    type: Number
  }
}, {
  versionKey: false
});

module.exports = Topic = mongoose.model("topics", TopicSchema);