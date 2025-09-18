/**
 * API Configuration utility
 * Handles environment variables and provides fallbacks
 */

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api-v1.oneklient.net',
  endpoints: {
    login: '/api/users/signin',
    roles: '/api/AspNetRoles/GetByProduct0'
  }
} as const;

export const isApiConfigured = (): boolean => {
  return Boolean(import.meta.env.VITE_API_BASE_URL);
};

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.endpoints): string => {
  return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
};

/**
 * Default login credentials for testing (as provided by manager)
 */
export const DEFAULT_CREDENTIALS = {
  orgIpc: '12345',
  indIpc: '67890',
  password: 'Rundie@1'
} as const;
