import { Injectable, NestMiddleware } from '@nestjs/common';
import { WinstonLogger } from '../services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: WinstonLogger = new WinstonLogger(LoggerMiddleware.name);

  use(req, res, next) {
    const startRequest = new Date().getTime();
    this.logger.log(`=> ${req.method} for ${req.url}`);
    next();
    const endResponse = new Date().getTime();
    this.logger.log(`<= HTTP Status ${res.statusCode} for ${req.method} ${req.url} - ${endResponse - startRequest} ms`);
  }
}
