import { sign, verify } from "jsonwebtoken";
import { TokenPayload, Tokens } from "@repo/types";
import dotenv from "dotenv";
dotenv.config();

export class JWTManager {
  static generateAccessToken(payload: TokenPayload): string {
    return sign(payload, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: "30m",
    });
  }

  static generateRefreshToken(payload: Pick<TokenPayload, "userId">): string {
    return sign(payload, String(process.env.REFRESH_TOKEN_SECRET), {
      expiresIn: "15d",
    });
  }

  static generateTokenPair(payload: TokenPayload): Tokens {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken({ userId: payload.userId }),
    };
  }

  static verifyAccessToken(token: string): TokenPayload {
    return verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as TokenPayload;
  }

  static verifyRefreshToken(token: string): Pick<TokenPayload, "userId"> {
    return verify(token, String(process.env.REFRESH_TOKEN_SECRET)) as Pick<
      TokenPayload,
      "userId"
    >;
  }
}
