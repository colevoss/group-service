import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export const hello = (event: APIGatewayEvent, context: Context, cb: Callback): void => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
};
