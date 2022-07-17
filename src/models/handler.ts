import { StatusCodes } from 'http-status-codes';

export interface IHeaders {
  [key: string]: string | boolean;
}

export interface IHandlerResponse {
  statusCode: StatusCodes;
  headers: IHeaders;
  body?: any;
}

export interface ISuccessResponseBody {
  status: string;
  data?: any;
  metadata?: IResponseMetadata;
}

export interface IResponseMetadata {
  pagination: IResponseBodyPagination;
}

export interface IResponseBodyPagination {
  self: string;
  next: string;
  last: string;
}

export interface IFailResponseBody {
  status: string;
  message: string;
  details?: any;
}

export interface IHelperResponse {
  statusCode: StatusCodes;
  message: string;
  body?: any;
}
