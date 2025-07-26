"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    decodeToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (_a) {
            return null;
        }
    }
    isTokenExpired(expiryTime, thresholdSeconds = 30) {
        return Date.now() >= (expiryTime - thresholdSeconds) * 1000;
    }
}
exports.TokenService = TokenService;
