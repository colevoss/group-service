import { APIGatewayEvent, Context, ProxyCallback } from 'aws-lambda';
import { mongo } from '../utils/mongo';
import { makeResponse } from '../utils/makeResponse';
import { removeProject } from '../transactions/removeProject';

export const removeProjectHandler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: ProxyCallback
): Promise<void> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const groupId = event.pathParameters.id;
  const projectId: string = JSON.parse(event.body).projectId;

  try {
    const db = await mongo();

    const group = await removeProject(db, groupId, projectId);

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
