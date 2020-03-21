const mongodb = require('mongodb');

const config = require('./../configuration');
const url = config.get('MONGO_URL');
const dbName = config.get('MONGO_DATABASE');
const auth = config.get('MONGO_AUTH');

module.exports = async function connect() {
  const connection = await mongodb.MongoClient.connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: false,
    replSet: {
      sslValidate: false
    }
  });

  const db = connection.db(dbName);
  return db;
};
