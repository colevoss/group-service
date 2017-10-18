const insertGroup = (db, groupData) => {
  if (groupData.name == null) {
    return Promise.reject('A name is required when creating a group');
  }

  return db
    .collection('groups')
    .insertOne(groupData)
    .then(groupInsert => {
      console.log('Inserted group with id: ', groupInsert.insertedId);
      return groupInsert.insertedId;
    });
};

module.exports = insertGroup;
