import { MongoClient, Db as IDb } from 'mongodb';

const MONGO_DB_URI: string = process.env.MONGO_DB_URI || '';
const MONGO_DB_NAME: string = process.env.MONGO_DB_NAME || '';
const MONGO_DB_PARAMS: string = process.env.MONGO_DB_PARAMS || '';

let dbCache: IDb;

const mongoConnectString = (): string => {
  let mongoString = `${MONGO_DB_URI}/${MONGO_DB_NAME}`;

  if (!!MONGO_DB_PARAMS) {
    mongoString += `?${MONGO_DB_PARAMS}`;
  }

  return mongoString;
};

export const mongo = async (): Promise<IDb> => {
  if (dbCache != null) return dbCache;

  const db = await MongoClient.connect(mongoConnectString());

  db.serverConfig;

  dbCache = db;

  return dbCache;
};
