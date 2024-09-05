import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDirectory = path.resolve('logs');

// Configuration de Winston avec des transports séparés pour chaque niveau
const logger = createLogger({
  level: 'info', // Niveau par défaut des logs
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Capture les stacks d'erreur
    format.json() // Format JSON pour une meilleure structure des logs
  ),
  transports: [
    new transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(logDirectory, 'info.log'),
      level: 'info',
    }),
    new transports.File({
      filename: path.join(logDirectory, 'combined.log'),
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} [${level}]: ${message} - ${stack}`
            : `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(logDirectory, 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(logDirectory, 'rejections.log'),
    }),
  ],
});

export default logger;
