import { TokenService } from './TokenService';
import { UserSession, SessionConfig } from './types';

export class SessionManager {
  private tokenService: TokenService;
  private currentSession: UserSession | null = null;

  constructor(private config: SessionConfig, secretKey: string) {
    this.tokenService = new TokenService(secretKey);
    this.loadSession();
  }

  private loadSession(): void {
    const session = localStorage.getItem('musafir_session');
    if (session) this.currentSession = JSON.parse(session);
  }

  private persistSession(): void {
    if (this.currentSession) {
      localStorage.setItem('musafir_session', JSON.stringify(this.currentSession));
    }
  }

  public initializeSession(idToken: string): boolean {
    const decoded = this.tokenService.decodeToken(idToken);
    if (!decoded) return false;

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

  public getCurrentSession(): UserSession | null {
    return this.currentSession;
  }

  public clearSession(): void {
    this.currentSession = null;
    localStorage.removeItem('musafir_session');
  }
}