import { MongoClient, Db as IDb } from 'mongodb';

const MONGO_URI: string = process.env.MONGO_URI;

let dbCache: IDb;

export const mongo = async (): Promise<IDb> => {
  if (dbCache != null) return dbCache;

  const db = await MongoClient.connect(MONGO_URI);

  dbCache = db;

  return dbCache;
};
