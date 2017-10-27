import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { addUsers } from '../transactions/addUsers';

export const addUsersHandler = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupId = event.pathParameters.id;
  const userIds: string[] = JSON.parse(event.body).userIds;

  try {
    const db = await mongo();

    const group = await addUsers(db, groupId, userIds);

    cb(null, makeResponse(200, { group }));
  } catch (e) {
    console.error(e);

    cb(
      e,
      makeResponse(500, {
        error: e.toString(),
      })
    );
  }
};
