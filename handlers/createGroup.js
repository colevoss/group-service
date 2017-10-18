'use strict';

const insertGroup = require('../transactions/insertGroup');
const findGroup = require('../transactions/findGroup');
const mongo = require('../db');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupData = JSON.parse(event.body);

  mongo()
    .then(db => {
      return insertGroup(db, groupData)
        .then(groupId => findGroup(db, groupId))
        .then(group => {
          console.log('Responding with group ', JSON.stringify(group));

          callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              group,
            }),
          });
        })
        .catch(err => {
          console.error(err);
          callback('ERRRRR');
        });
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};
