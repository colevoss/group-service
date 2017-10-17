import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../types/IGroup';

export const getGroup = async (db: IDb, id: string): Promise<IGroup> => {
  const group = await db.collection('groups').findOne<IGroup>({
    _id: new ObjectId(id),
  });

  return group;
};
