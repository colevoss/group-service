import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { getManyGroups } from '../transactions/getManyGroups';

export const getMany = async (event: APIGatewayEvent, context: Context, cb: ProxyCallback): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupIdsParam = event.queryStringParameters.ids;

  const groupIds = groupIdsParam.split(',');

  try {
    const db = await mongo();
    const groups = await getManyGroups(db, groupIds);

    cb(
      null,
      makeResponse(200, {
        groups,
      })
    );
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
