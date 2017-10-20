import { Db as IDb, ObjectId } from 'mongodb';
import { IGroupInput } from '../types/IGroup';

export const createGroup = async (db: IDb, groupInput: IGroupInput): Promise<ObjectId> => {
  const groupData = {
    ...groupInput,
    userIds: groupInput.userIds.map(id => new ObjectId(id)),
  };

  const groupInsert = await db.collection('groups').insertOne(groupData);

  if (groupInsert.insertedCount == 0) {
    throw 'A user could not be created';
  }

  const groupId = groupInsert.insertedId;

  return groupId;
};
