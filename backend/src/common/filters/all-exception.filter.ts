import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { WinstonLogger } from '../services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: WinstonLogger = new WinstonLogger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse: any = (exception instanceof HttpException) ? exception.getResponse() : 'Server Error';
    this.logger.error(`<= HTTP Status ${status}: ${exceptionResponse.message || exceptionResponse} for ${request.method} ${request.url}`, exception);
    response.status(status).json({
      statusCode: status,
      message: exceptionResponse || exceptionResponse.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
