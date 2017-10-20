import { ObjectId } from 'mongodb';

export interface IGroup {
  _id: ObjectId;
  name: string;
  userIds?: Array<ObjectId>;
  projectIds?: Array<ObjectId>;
}

export interface IGroupInput {
  name: string;
  userIds: Array<string>;
  projectIds?: Array<string>;
}
