import * as ddb from '../lib/aws/ddb';
import { IConnection } from '../models/connection';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export const create = async (connection: IConnection): Promise<void> => {
  await ddb.put({
    TableName: process.env.WEB_SOCKET_CONNECTIONS_TABLE,
    Item: marshall(connection)
  });
};

export const deleteConnection = async (connectionId: string): Promise<void> => {
  await ddb.deleteItem({
    TableName: process.env.WEB_SOCKET_CONNECTIONS_TABLE,
    Key: marshall({ connectionId })
  });
};

export const listConnections = async (
  baseId: string
): Promise<IConnection[]> => {
  const params = {
    TableName: process.env.WEB_SOCKET_CONNECTIONS_TABLE,
    IndexName: 'baseId-index',
    KeyConditionExpression: '#BaseId = :baseId',
    ExpressionAttributeNames: {
      '#BaseId': 'baseId'
    },
    ExpressionAttributeValues: marshall({
      ':baseId': baseId
    })
  };

  const res = await ddb.query(params);

  return (
    res.Items ? res.Items.map((item) => unmarshall(item)) : []
  ) as IConnection[];
};
