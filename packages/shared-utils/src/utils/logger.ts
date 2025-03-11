import util from "util";
import dayjs from "dayjs";
import path from "path";
import "winston-mongodb";
import { blue, green, magenta, red, yellow } from "colorette";
import { createLogger, transports, format } from "winston";
import { ApplicationEnvirontment } from "@repo/types";

// Create a global config object that can be set once and used everywhere
export const loggerConfig = {
  env: ApplicationEnvirontment.DEVELOPMENT, // Default to development
  mongoUrl: "",
  logFilePath: "",
};

// Function to configure logger
export function configureLogger(config: {
  env?: string;
  mongoUrl?: string;
  logFilePath?: string;
}) {
  // Update the config with provided values
  if (config.env) loggerConfig.env = config.env;
  if (config.mongoUrl) loggerConfig.mongoUrl = config.mongoUrl;
  if (config.logFilePath) loggerConfig.logFilePath = config.logFilePath;
}

const colorizeLevel = (level: string): string => {
  switch (level) {
    case "ERROR":
      return red(level);
    case "warn":
      return yellow(level);
    case "INFO":
      return blue(level);
    default:
      return level;
  }
};

const consoleLogFormat = format.printf((info) => {
  const { level, timestamp, message, meta = {} } = info;
  const customLevel = colorizeLevel(level.toUpperCase());
  const customTimestamp = green(
    dayjs(timestamp as string).format("YYYY-MM-DD HH:mm:ss")
  );
  const customMessage = message;
  const customMeta = util.inspect(meta, {
    showHidden: false,
    depth: null,
    colors: true,
  });
  const customLog = `${customLevel} - ${customTimestamp} - ${customMessage}\n${magenta(`META`)} ${customMeta}\n`;

  return customLog;
});

const fileLogFormat = format.printf((info) => {
  const { level, timestamp, message, meta = {} } = info;
  const logMeta: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
    if (value instanceof Error) {
      logMeta[key] = [
        {
          name: value.name,
          message: value.message,
          trace: value.stack || "",
        },
      ];
    } else {
      logMeta[key] = value;
    }
  }
  const logData = {
    level: level.toUpperCase(),
    timestamp: dayjs(timestamp as string).format("YYYY-MM-DD HH:mm:ss"),
    message,
    meta: logMeta,
  };
  return JSON.stringify(logData, null, 2);
});

// Create a function to get the appropriate transports based on the config
const getTransports = () => {
  const transportsArray = [];

  // File transport (always included)
  const logPath =
    loggerConfig.logFilePath ||
    path.join(__dirname, `../../../logs/${loggerConfig.env}.log`);
  transportsArray.push(
    new transports.File({
      filename: logPath,
      level: "info",
      format: format.combine(format.timestamp(), fileLogFormat),
    })
  );

  // Console transport (only in development)
  if (loggerConfig.env === ApplicationEnvirontment.DEVELOPMENT) {
    transportsArray.push(
      new transports.Console({
        level: "info",
        format: format.combine(format.timestamp(), consoleLogFormat),
      })
    );
  }

  // MongoDB transport (only in production with MongoDB URL)
  if (
    loggerConfig.env === ApplicationEnvirontment.PRODUCTION &&
    loggerConfig.mongoUrl
  ) {
    transportsArray.push(
      new transports.MongoDB({
        level: "info",
        db: loggerConfig.mongoUrl,
        expireAfterSeconds: 60 * 60 * 24 * 7, // 7 days
      })
    );
  }

  return transportsArray;
};

// Create the logger with dynamic transports
export const logger = createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: getTransports(),
});

// Export a utility function to get the current environment
export const getEnv = () => loggerConfig.env;
