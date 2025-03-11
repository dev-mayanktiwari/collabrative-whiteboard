import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

type configKeys = "PORT" | "NODE_ENV" | "MONGO_URI";

const _config: Record<configKeys, string | undefined> = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
};

export const AppConfig = {
  get(key: string): string | number {
    const value = _config[key as configKeys];

    if (!value) {
      throw new Error(`Config Error: Key ${key} not found`);
      process.exit(1);
    }

    if (key === "PORT") {
      return parseInt(value);
    }
    
    return value;
  },
};
