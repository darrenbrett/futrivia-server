const mongodb = require('mongodb');
const config = require('./../configuration');
const url = config.get('MONGO_URL');
const dbName = config.get('MONGO_DATABASE');

async function connect() {
  const connection = await mongodb.MongoClient.connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: false,
    replSet: {
      sslValidate: false
    }
  });
  return connection;
}

async function findOne(collection, filter = {}) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).findOne(filter);
  await connection.close();
  return result;
}

async function findOneAndUpdate(collection, targetProp, updateOp) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).findOneAndUpdate(targetProp, updateOp);
  await connection.close();
  return result;
}

async function deleteMany(collection, filter = {}) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).deleteMany(filter);
  await connection.close();
  return result;
}

async function insert(collection, docs) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).insert(docs);
  await connection.close();
  return result;
}

module.exports = {
  findOne,
  findOneAndUpdate,
  insert,
  deleteMany
};