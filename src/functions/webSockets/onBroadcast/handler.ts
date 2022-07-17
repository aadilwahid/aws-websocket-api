import * as AWS from 'aws-sdk';
import { SQSEvent } from 'aws-lambda';

import { IBroadcastPayload } from '../../../models/connection';
import {
  deleteConnection,
  listConnections
} from '../../../repositories/connection';

export const onBroadcast = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    try {
      console.log(`onBroadcast :: START :: ${JSON.stringify(record)}`);

      const payload = JSON.parse(record.body) as IBroadcastPayload;

      if (!payload.baseId) {
        console.log(`onBroadcast :: baseId should not be empty`);
        return;
      }

      /**
       * Get all the concerned connections from
       * database that are currently connected
       */
      const connections = await listConnections(payload.baseId);
      if (!connections) {
        console.log(
          `onBroadcast :: No active connections found for baseId :: ${payload.baseId}`
        );
        return;
      }

      const apiGWManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: connections[0].endpoint // should've been better approach
      });

      const postCalls = connections.map(async ({ connectionId }) => {
        try {
          await apiGWManagementApi
            .postToConnection({
              ConnectionId: connectionId,
              Data: JSON.stringify(payload)
            })
            .promise();
        } catch (err) {
          console.error(
            `onBroadcast :: postToConnection :: ${JSON.stringify(err)}`
          );

          if (err.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            await deleteConnection(connectionId);
          } else {
            throw err;
          }
        }
      });

      await Promise.all(postCalls);
    } catch (error) {
      console.log(`onBroadcast :: ERROR :: ${JSON.stringify(error)}`);
    }
  }
};
