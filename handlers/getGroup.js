'use strict';

const findGroup = require('../transactions/findGroup');
const mongo = require('../db');

module.exports.get = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupId = event.pathParameters.id;

  mongo()
    .then(db => findGroup(db, groupId))
    .then(group => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          group,
        }),
      });
    })
    .catch(err => {
      console.err(err);
      callback('ERRRRRRRRRRRRRRRr');
    });
};
