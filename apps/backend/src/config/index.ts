import dotenv from "dotenv";
dotenv.config();

type configKeys = "PORT" | "MONGO_URI" | "ENV";

const _config: Record<configKeys, string | undefined> = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ENV: process.env.ENV,
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
