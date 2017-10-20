import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../../types/IGroup';
import { createGroup } from '../createGroup';
import { mongo } from '../../utils/mongo';

let db: IDb;
const groupInput = {
  name: 'Test Group',
  userIds: ['59dc2f34eafc40e0d61b6297'],
};

let groupId;
let group;

beforeAll(async () => {
  db = await mongo();

  groupId = await createGroup(db, groupInput);

  group = await db.collection('groups').findOne<IGroup>({ _id: groupId });
});

afterAll(async () => {
  await db.close();
});

test('Creates a group in the database', () => {
  expect(group.name).toBe(groupInput.name);
});

test('Creates group with provided user ids', () => {
  expect(group.userIds).toHaveLength(1);
});

test('Transforms userIds to ObjectIds', () => {
  expect(group.userIds[0]).toBeInstanceOf(ObjectId);
});
