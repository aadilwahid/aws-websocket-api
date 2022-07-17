export enum BROADCAST_SUBJECT {
  PROJECT_ADDED = 'project_added',
  PROJECT_UPDATED = 'project_updated',
  PROJECT_DELETED = 'project_deleted',
  PROJECT_COMMENT_ADDED = 'project_comment_added',
  PROJECT_COMMENT_UPDATED = 'project_comment_updated',
  PROJECT_COMMENT_DELETED = 'project_comment_deleted',
  FILE_UPLOADED = 'file_uploaded',
  FILE_DELETED = 'file_deleted'
}

export interface IConnection {
  connectionId: string;
  baseId: string;
  dateCreated: string;
  endpoint: string;
}

export interface IBroadcastPayload {
  baseId: string;
  projectId: string;
  subject: BROADCAST_SUBJECT;
  data: any;
}
