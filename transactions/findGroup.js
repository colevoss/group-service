const { ObjectId } = require('mongodb');

const findGroup = (db, groupId) => {
  return db
    .collection('groups')
    .findOne({ _id: new ObjectId(groupId) })
    .then(group => {
      console.log('Found group!: ', group);

      return group;
    });
};

module.exports = findGroup;
