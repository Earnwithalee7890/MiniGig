/**
 * Structured logger for MiniGig.
 * Supports different log levels and environment-based silencing.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const IS_PROD = import.meta.env.PROD;

const log = (level: LogLevel, message: string, ...args: any[]) => {
  if (IS_PROD && level === 'debug') return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case 'info':
      console.log(prefix, message, ...args);
      break;
    case 'warn':
      console.warn(prefix, message, ...args);
      break;
    case 'error':
      console.error(prefix, message, ...args);
      break;
    case 'debug':
      console.debug(prefix, message, ...args);
      break;
  }
};

export const logger = {
  info: (msg: string, ...args: any[]) => log('info', msg, ...args),
  warn: (msg: string, ...args: any[]) => log('warn', msg, ...args),
  error: (msg: string, ...args: any[]) => log('error', msg, ...args),
  debug: (msg: string, ...args: any[]) => log('debug', msg, ...args),
};
