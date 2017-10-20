import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../types/IGroup';

import { getGroup } from './getGroup';

export const addProject = async (db: IDb, groupId: string, projectId: string): Promise<IGroup> => {
  const groupUpdate = await db.collection('groups').findOneAndUpdate(
    { _id: new ObjectId(groupId) },
    {
      $addToSet: {
        projectIds: new ObjectId(projectId),
      },
    }
  );

  return await getGroup(db, groupId);
};
