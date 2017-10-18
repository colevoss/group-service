const { ObjectId } = require('mongodb');

const mapToObjectId = ids => ids.map(id => new ObjectId(id));

const findGroups = (db, ids) => {
  return db
    .collection('groups')
    .find({
      _id: { $in: mapToObjectId(ids) },
    })
    .toArray()
    .then(groups => {
      console.log('Found Groups: ', groups);

      return groups;
    });
};

module.exports = findGroups;
