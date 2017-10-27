import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../types/IGroup';

import { getGroup } from './getGroup';

export const addUsers = async (db: IDb, groupId: string, userIds: string[]): Promise<IGroup> => {
  const groupUpdate = await db.collection('groups').findOneAndUpdate(
    { _id: new ObjectId(groupId) },
    {
      $addToSet: {
        userIds: {
          $each: userIds.map(id => new ObjectId(id)),
        },
      },
    }
  );

  return await getGroup(db, groupId);
};
