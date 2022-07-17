import { IHandlerResponse } from '../../../models/handler';
import { okNoContent, serverError } from '../../../lib/response';
import { deleteConnection } from '../../../repositories/connection';

export const onDisconnect = async (event: any): Promise<IHandlerResponse> => {
  try {
    // console.log(`onDisconnect :: START :: ${JSON.stringify(event)}`);

    await deleteConnection(event.requestContext.connectionId);
    console.log(
      `onDisconnect :: connection deleted :: ${event.requestContext.connectionId}`
    );
  } catch (error) {
    console.log(`onDisconnect :: ERROR :: ${JSON.stringify(error)}`);
    return serverError('internal server error');
  }

  return okNoContent();
};
