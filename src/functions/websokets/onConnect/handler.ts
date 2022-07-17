import { create } from '../../../repositories/connection';
import { IConnection } from '../../../models/connection';
import { IHandlerResponse } from '../../../models/handler';
import { clientError, okNoContent, serverError } from '../../../lib/response';

export const onConnect = async (event: any): Promise<IHandlerResponse> => {
  try {
    console.log(`onConnect :: START :: ${JSON.stringify(event)}`);

    const connection: IConnection = {
      connectionId: event.requestContext.connectionId,
      baseId: event.queryStringParameters?.baseId
        ? event.queryStringParameters.baseId
        : undefined,
      dateCreated: new Date().getTime().toString(),
      endpoint:
        event.requestContext.domainName + '/' + event.requestContext.stage
    };
    if (!connection.baseId) {
      console.log(
        `onConnect :: baseId not found for the connection :: ${JSON.stringify(
          event
        )}`
      );
      return clientError(`onConnect :: base id cannot be empty`);
    }

    await create(connection);
  } catch (error) {
    console.log(`onConnect :: ERROR : ${JSON.stringify(error)}`);
    return serverError('internal server error');
  }

  return okNoContent();
};
