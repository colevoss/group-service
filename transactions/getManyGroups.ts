import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../types/IGroup';

const mapToObjectIds = (ids: Array<string | ObjectId>): Array<ObjectId> => ids.map(id => new ObjectId(id));

export const getManyGroups = async (db: IDb, ids: Array<string | ObjectId>): Promise<Array<IGroup>> => {
  const groups = await db
    .collection('groups')
    .find<IGroup>({
      _id: {
        $in: mapToObjectIds(ids),
      },
    })
    .toArray();

  return groups;
};
