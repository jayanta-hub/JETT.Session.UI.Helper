"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const TokenService_1 = require("./TokenService");
class SessionManager {
    constructor(config, secretKey) {
        this.config = config;
        this.currentSession = null;
        this.tokenService = new TokenService_1.TokenService(secretKey);
        this.loadSession();
    }
    loadSession() {
        const session = localStorage.getItem('musafir_session');
        if (session)
            this.currentSession = JSON.parse(session);
    }
    persistSession() {
        if (this.currentSession) {
            localStorage.setItem('musafir_session', JSON.stringify(this.currentSession));
        }
    }
    initializeSession(idToken) {
        const decoded = this.tokenService.decodeToken(idToken);
        if (!decoded)
            return false;
        this.currentSession = {
            userId: decoded.userId,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            tenantId: decoded.tenantId,
            accessToken: 'mock_access_token_' + Math.random().toString(36).slice(2),
            refreshToken: 'mock_refresh_token_' + Math.random().toString(36).slice(2),
            tokenExpiry: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
        };
        this.persistSession();
        return true;
    }
    getCurrentSession() {
        return this.currentSession;
    }
    clearSession() {
        this.currentSession = null;
        localStorage.removeItem('musafir_session');
    }
}
exports.SessionManager = SessionManager;
