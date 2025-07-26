export interface UserSession {
  userId: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: number; // Unix timestamp
}

export interface SessionConfig {
  authConfig: {
    authBaseUrl: string;
    clientId: string;
    clientSecret: string;
    tokenRefreshThresholdSeconds: number;
  };
  tenantBaseUrls: Record<string, string>;
}