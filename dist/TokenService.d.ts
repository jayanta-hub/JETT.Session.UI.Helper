export declare class TokenService {
    private secretKey;
    constructor(secretKey: string);
    decodeToken(token: string): any;
    isTokenExpired(expiryTime: number, thresholdSeconds?: number): boolean;
}
