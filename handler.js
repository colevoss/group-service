'use strict';

const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;

const groupData = {
  name: 'Test Serverless group',
};

let dbCache;

module.exports.hello = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  MongoClient.connect(MONGO_URI)
    .then(db => {
      dbCache = db;

      db
        .collection('groups')
        .insertOne(groupData)
        .then(groupInsert => {
          const groupId = groupInsert.insertedId;

          db
            .collection('groups')
            .findOne({ _id: groupId })
            .then(group => {
              callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                  group,
                }),
              });

              // db.close();
            });
        })
        .catch(err => {
          callback('An error occured while creating user in MongoDB', err);
        });
    })
    .catch(err => {
      callback('An error occured connecting to MongoDB', err);
    });

  // callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
