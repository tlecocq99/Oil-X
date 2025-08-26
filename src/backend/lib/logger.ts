export type LogLevel = "debug" | "info" | "warn" | "error";

function ts() {
  return new Date().toISOString();
}

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const CURRENT_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

function shouldLog(level: LogLevel) {
  return levelOrder[level] >= levelOrder[CURRENT_LEVEL];
}

export const logger = {
  debug: (...args: unknown[]) =>
    shouldLog("debug") && console.debug(ts(), "DEBUG", ...args),
  info: (...args: unknown[]) =>
    shouldLog("info") && console.info(ts(), "INFO", ...args),
  warn: (...args: unknown[]) =>
    shouldLog("warn") && console.warn(ts(), "WARN", ...args),
  error: (...args: unknown[]) =>
    shouldLog("error") && console.error(ts(), "ERROR", ...args),
};

export function logStartupBanner(port: number) {
  logger.info(`Backend listening on :${port}`);
}
