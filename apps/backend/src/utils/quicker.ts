import { v6 } from "uuid";
import os from "os";
import { AppConfig } from "../config";
import dayjs, { ManipulateType } from "dayjs";

export default {
  getSystemHealth: () => {
    return {
      cpuUsage: os.loadavg(),
      totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
      freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
    };
  },
  getApplicationHealth: () => {
    return {
      environment: AppConfig.get("ENV"),
      uptime: `${process.uptime().toFixed(2)} seconds`,
      memoryUsage: {
        totalHeap: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(
          2
        )} MB`,
        usedHeap: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB`,
      },
    };
  },
  generateVerifyToken: (amount: number, unit: ManipulateType) => {
    const token = v6();
    const expiry = dayjs().add(amount, unit).toISOString();
    return {
      token,
      expiry,
    };
  },
  generateCode: (n: number) => {
    if (n <= 0) {
      return null;
    }
    const min = Math.pow(10, n - 1);
    const max = Math.pow(10, n) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  generateExpiryTime: (minutes: number) => {
    return dayjs().add(minutes, "minutes").toISOString();
  },
  calculateTimeDifference: (start: Date) => {
    const initTime = dayjs(start);
    const currentTime = dayjs();
    const diff = currentTime.diff(initTime, "minutes");
    return diff;
  },
};
