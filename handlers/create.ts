import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getGroup } from '../transactions/getGroup';
import { createGroup } from '../transactions/createGroup';
import { IGroupInput } from '../types/IGroup';

export const create = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupInput: IGroupInput = JSON.parse(event.body);

  if (groupInput.userIds == null || groupInput.userIds.length === 0) {
    return cb(null, makeResponse(422, { error: 'A group must include user ids' }));
  }

  try {
    const db = await mongo();

    const groupId = await createGroup(db, groupInput);

    const group = await getGroup(db, groupId);

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
