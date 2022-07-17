import { StatusCodes } from 'http-status-codes';

import {
  IHandlerResponse,
  ISuccessResponseBody,
  IFailResponseBody
} from '@models/handler';

const ok = (responseData: any): IHandlerResponse => {
  const body: ISuccessResponseBody = {
    status: 'success',
    data: responseData
  };

  return {
    statusCode: StatusCodes.OK,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};

const okNoContent = (): IHandlerResponse => {
  const body: ISuccessResponseBody = {
    status: 'success'
  };

  return {
    statusCode: StatusCodes.NO_CONTENT,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};

const clientError = (
  errMessage: string,
  responseData: any = ''
): IHandlerResponse => {
  const body: IFailResponseBody = {
    status: 'fail',
    message: errMessage,
    details: responseData
  };

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};

const notFound = (errMessage: string): IHandlerResponse => {
  const body: IFailResponseBody = {
    status: 'fail',
    message: errMessage
  };

  return {
    statusCode: StatusCodes.NOT_FOUND,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};

const serverError = (
  errMessage: string,
  responseData: any = ''
): IHandlerResponse => {
  const body: IFailResponseBody = {
    status: 'error',
    message: errMessage,
    details: responseData
  };

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};

export { ok, okNoContent, clientError, notFound, serverError };
