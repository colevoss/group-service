import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../../types/IGroup';
import { getGroup } from '../getGroup';
import { mongo } from '../../utils/mongo';

let db: IDb;
let group;
let groupId: ObjectId;

beforeAll(async () => {
  db = await mongo();

  const groupInsert = await db.collection('groups').insertOne({ name: 'Test Group' });
  groupId = groupInsert.insertedId;

  group = await getGroup(db, groupId);
});

afterAll(async () => {
  await db.close();
});

test('Gets group from database by id', () => {
  expect(group.name).toBe('Test Group');
});

test('Group has matching id', () => {
  expect(groupId.toHexString()).toBe(group._id.toHexString());
});
