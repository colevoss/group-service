import { Db as IDb, ObjectId } from 'mongodb';
import { IGroup } from '../../types/IGroup';
import { addProject } from '../addProject';
import { mongo } from '../../utils/mongo';

let projectId = '59dc2f34eafc40e0d61b6297';

let db: IDb;
let group;
let groupId: ObjectId;

beforeAll(async () => {
  db = await mongo();

  const groupInsert = await db.collection('groups').insertOne({ name: 'Test Group' });
  groupId = groupInsert.insertedId;
});

afterAll(async () => {
  await db.close();
});

test('Adds a project to the group', async () => {
  const updatedGroup = await addProject(db, groupId, projectId);

  expect(updatedGroup.projectIds.map(id => id.toHexString())).toHaveLength(1);
  expect(updatedGroup.projectIds[0].toHexString()).toEqual(projectId);
});
