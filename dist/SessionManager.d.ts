import { UserSession, SessionConfig } from './types';
export declare class SessionManager {
    private config;
    private tokenService;
    private currentSession;
    constructor(config: SessionConfig, secretKey: string);
    private loadSession;
    private persistSession;
    initializeSession(idToken: string): boolean;
    getCurrentSession(): UserSession | null;
    clearSession(): void;
}
