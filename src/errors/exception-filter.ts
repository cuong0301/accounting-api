import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ApiError } from './exceptions';
import { EntityNotFoundError } from 'typeorm';

export const RESPONSE_API_ERROR_SYMBOL = Symbol.for('RESPONSE_API_ERROR');

const convertException = (exception: unknown): ApiError => {
  if (exception instanceof ApiError) {
    return exception;
  } else if (exception instanceof HttpException) {
    return ApiError.fromHttpException(exception);
  } else if (exception instanceof EntityNotFoundError) {
    return new ApiError('NOT_FOUND', exception.message);
  } else if (exception instanceof Error) {
    return new ApiError(
      'INTERNAL_SERVER_ERROR',
      exception.message,
      exception.stack || exception,
    );
  } else {
    return new ApiError('INTERNAL_SERVER_ERROR');
  }
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const ex = convertException(exception);
    response[RESPONSE_API_ERROR_SYMBOL] = ex;

    super.catch(ex, host);
  }
}
