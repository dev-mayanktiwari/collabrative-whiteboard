import { JWTManager } from "@repo/jwt";

export function authMiddleware(req: any): any {
  try {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const token = url.searchParams.get("token");

    if (!token) {
      console.error("No token provided");
      return null;
    }

    const decoded = JWTManager.verifyAccessToken(token);
    return decoded;
  } catch (error) {
    console.error("Error verifying token", error);
    return null;
  }
}
