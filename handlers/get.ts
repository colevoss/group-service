import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getGroup } from '../transactions/getGroup';

export const get = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupId = event.pathParameters.id;

  try {
    const db = await mongo();

    const group = await getGroup(db, groupId);

    if (group == null) {
      cb(
        null,
        makeResponse(400, {
          error: `A group with the ID of ${groupId} could not be found`,
        })
      );

      return;
    }

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
