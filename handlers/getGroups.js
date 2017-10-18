'use strict';

const findGroups = require('../transactions/findGroups');
const mongo = require('../db');

module.exports.getMany = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupIdsParam = event.queryStringParameters.groupIds;

  if (groupIdsParam == null) {
    return callback('Must provide a list of group ids to find');
  }

  const groupIds = groupIdsParam.split(',');

  mongo()
    .then(db => findGroups(db, groupIds))
    .then(groups => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          groups,
        }),
      });
    })
    .catch(err => {
      console.err(err);
      callback('ERRRRRRRRRRRRRRRr');
    });
};
