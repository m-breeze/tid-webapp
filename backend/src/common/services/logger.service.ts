import { LoggerService } from '@nestjs/common';
import * as config from 'config';
import * as winston from 'winston';
import * as chalk from 'chalk';
import { Logger } from 'winston';

export class WinstonLogger implements LoggerService  {
  private readonly logger: Logger;

  constructor(private context: string) {
    const transports = [
        new winston.transports.Console(config.logger.winston.options.console),
        new winston.transports.File(config.logger.winston.options.file),
      ];
    this.logger = (winston as any).createLogger({
      transports,
      exitOnError: false });
  }

  log(message: string): void {
    const currentDate = new Date();
    this.logger.info(message, {
    timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.coloredConsoleLog('info', message);
  }
  error(message: string, trace?: any): void {
    const currentDate = new Date();
    this.logger.error(message, {
      timestamp: currentDate.toISOString(),
    });
    // tslint:disable-next-line no-console
    console.log(trace.stack);
    this.coloredConsoleLog('error', message);
  }
  warn(message: string): void {
    const currentDate = new Date();
    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });
    this.coloredConsoleLog('warn', message);
  }

  private coloredConsoleLog(level: string, message: string): void {
    if (config.logger.winston.colorConsoleLogEnable) {
      let result = '';
      const color = chalk.default;
      const currentDate = new Date();
      const format = (value) => (value < 10) ? `0${value}` : value;
      const time = `${format(currentDate.getHours())}:${format(currentDate.getMinutes())}:${format(currentDate.getSeconds())}`;

      switch (level) {
        case 'info':
          result = `${color.dim.green.bold.underline(time)} [${color.cyan('INFO')}] [${color.green(this.context)}] ${message}`;
          break;
        case 'error':
          result = `${color.dim.green.bold.underline(time)} [${color.red('ERR')}] [${color.green(this.context)}] ${message}`;
          break;
        case 'warn':
          result = `${color.dim.green.bold.underline(time)} [${color.yellow('WARN')}] [${color.green(this.context)}] ${message}`;
          break;
        default:
          break;
      }
      // tslint:disable-next-line no-console
      console.log(result);
    }
  }

}
