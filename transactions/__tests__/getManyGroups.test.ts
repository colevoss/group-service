import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../../types/IGroup';
import { getManyGroups } from '../getManyGroups';
import { mongo } from '../../utils/mongo';

let db: IDb;
let groups;

const groupInputs = [{ name: 'Test Group 1' }, { name: 'Test Group 2' }];

let groupIds: ObjectId[];

beforeAll(async () => {
  db = await mongo();

  const groupInserts = await db.collection('groups').insertMany(groupInputs);
  groupIds = groupInserts.insertedIds;

  groups = await getManyGroups(db, groupIds);
});

afterAll(async () => {
  await db.close();
});

test('Gets groups for each id provided', () => {
  expect(groups).toHaveLength(2);
});
