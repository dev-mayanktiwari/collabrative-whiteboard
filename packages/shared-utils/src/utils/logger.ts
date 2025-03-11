import util from "util";
import dayjs from "dayjs";
import path from "path";
import "winston-mongodb";
import { blue, green, magenta, red, yellow } from "colorette";
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from "winston/lib/winston/transports";
import { createLogger, transports, format } from "winston";
import { MongoDBTransportInstance } from "winston-mongodb";
import { ApplicationEnvirontment } from "@repo/types";

// Logger configuration interface
export interface LoggerConfig {
  env: "production" | "development";
  mongoUrl?: string;
  logFilePath?: string;
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

const consoleTransport = (
  config: LoggerConfig
): Array<ConsoleTransportInstance> => {
  if (config.env === ApplicationEnvirontment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: "info",
        format: format.combine(format.timestamp(), consoleLogFormat),
      }),
    ];
  }
  return [];
};

const mongoTransport = (
  config: LoggerConfig
): Array<MongoDBTransportInstance> => {
  if (config.env === ApplicationEnvirontment.PRODUCTION && config.mongoUrl) {
    return [
      new transports.MongoDB({
        level: "info",
        db: config.mongoUrl,
        expireAfterSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
    ];
  }
  return [];
};

const fileTransport = (config: LoggerConfig): Array<FileTransportInstance> => {
  const logPath =
    config.logFilePath ||
    path.join(__dirname, `../../../logs/${config.env}.log`);
  return [
    new transports.File({
      filename: logPath,
      level: "info",
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};

export const createAppLogger = (config: LoggerConfig) => {
  return createLogger({
    defaultMeta: {
      meta: {},
    },
    transports: [
      ...fileTransport(config),
      ...consoleTransport(config),
      ...mongoTransport(config),
    ],
  });
};
