import dotenv from "dotenv";
dotenv.config();

type configKeys =
  | "PORT"
  | "MONGO_URI"
  | "ENV"
  | "SALT_ROUNDS"
  | "MAILGUN_API_KEY"
  | "MAILGUN_DOMAIN";

const _config: Record<configKeys, string | undefined> = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  ENV: process.env.ENV,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
};

export const AppConfig = {
  get(key: configKeys): string | number {
    const value = _config[key as configKeys];

    if (!value) {
      throw new Error(`Config Error: Key ${key} not found`);
    }

    if (key === "PORT") {
      return parseInt(value);
    }

    return value;
  },
};
