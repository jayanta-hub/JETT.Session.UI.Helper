import jwt from 'jsonwebtoken';

export class TokenService {
  constructor(private secretKey: string) {}

  decodeToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch {
      return null;
    }
  }

  isTokenExpired(expiryTime: number, thresholdSeconds = 30): boolean {
    return Date.now() >= (expiryTime - thresholdSeconds) * 1000;
  }
}