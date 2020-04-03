const mongodb = require("mongodb");
const config = require("./../configuration");
const url = config.get("MONGO_URL");
const dbName = config.get("MONGO_DATABASE");

async function connect() {
  const connection = await mongodb.MongoClient.connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslValidate: false,
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

async function findLast(collection, filter = {}) {
  let dataArr = [];
  const connection = await connect();
  const db = connection.db(dbName);
  await db
    .collection(collection)
    .find(filter)
    .sort({
      $natural: -1
    })
    .limit(1)
    .forEach(doc => {
      dataArr.push(doc);
    });
  await connection.close();
  return dataArr[0];
}

async function findOneAndUpdate(collection, targetDoc, updateOp) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).findOneAndUpdate(targetDoc, updateOp);
  await connection.close();
  return result;
}

async function find(collection, filter = {}, sort = {}) {
  let dataArr = [];
  const connection = await connect();
  const db = connection.db(dbName);
  await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .forEach(doc => {
      dataArr.push(doc);
    });

  await connection.close();
  return dataArr;
}

async function findTop(collection, filter = {}, limit = 0) {
  let dataArr = [];
  const connection = await connect();
  const db = connection.db(dbName);
  await db
    .collection(collection)
    .find()
    .sort(filter)
    .limit(limit)
    .forEach(doc => {
      dataArr.push(doc);
    });
  await connection.close();
  return dataArr;
}

async function deleteMany(collection, filter = {}) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).deleteMany(filter);
  await connection.close();
  return result;
}

async function insertOne(collection, docs) {
  const connection = await connect();
  const db = connection.db(dbName);
  const result = await db.collection(collection).insertOne(docs);
  await connection.close();
  return result;
}

module.exports = {
  findOne,
  findOneAndUpdate,
  findLast,
  find,
  findTop,
  insertOne,
  deleteMany
};
