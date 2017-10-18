const { MongoClient } = require('mongodb');
const MONGO_URI = process.env.MONGO_URI;

let dbCache;

const mongo = () => {
  if (dbCache != null) return Promise.resolve(dbCache);

  return MongoClient.connect(MONGO_URI).then(db => {
    dbCache = db;

    return dbCache;
  });
};

module.exports = mongo;
