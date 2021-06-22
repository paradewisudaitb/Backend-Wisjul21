import winston, { format } from 'winston';

let logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
  ),
  defaultMeta: { service: 'Backend Wisjul 21' },
  transports: [
    new winston.transports.File({
      dirname: 'logs',
      filename: 'errors.log',
      level: 'error',
      // maxsize: 5242880,
      format: format.combine(
        format.json(),
        format.colorize({ all: false })
      ),
    }),

    new winston.transports.File({
      dirname: 'logs',
      filename: 'combined.log',
      // maxsize: 5242880,
      format: format.combine(
        format.json(),
        format.colorize({ all: false })
      ),
    }),

    new winston.transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.colorize({ level: true })
      ),
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const loggerStream = {
  write (msg: string) {
    logger.info(msg.substring(0, msg.lastIndexOf('\n')));
  }
};
export default logger;