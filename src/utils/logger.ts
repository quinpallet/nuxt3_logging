import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

interface LoggerConfig {
  logPath: string;
  logLevel: string;
}

function getLoggerConfig(): LoggerConfig {
  return {
    // logPath: process.env.LOG_PATH || path.join(process.cwd(), 'logs'),
    logPath: process.env.LOG_PATH || path.join('c:/', 'logs'),
    logLevel: process.env.LOG_LEVEL || 'info',
  };
}

function ensureLogDirectory(logPath: string) {
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
  }
}

export function createCustomLogger() {
  const loggerConfig = getLoggerConfig();
  ensureLogDirectory(loggerConfig.logPath);

  const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  );

  const fileRotateTransport = new DailyRotateFile({
    filename: path.join(loggerConfig.logPath, 'frontend-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '1d',
    zippedArchive: true,
  });

  return createLogger({
    level: loggerConfig.logLevel,
    format: logFormat,
    transports: [
      fileRotateTransport,
      new transports.Console(),
    ],
  });
}

export const logger = createCustomLogger();
