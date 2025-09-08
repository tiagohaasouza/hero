import { defineStore } from 'pinia';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'authenticated' | 'error';
  error: string | null;
}

/**
 * Authentication store responsible for holding access and refresh tokens as
 * well as basic status flags. It provides actions to authenticate, refresh and
 * logout, allowing components and guards to react to changes globally.
 */
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    status: 'idle',
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => state.status === 'authenticated',
  },
  actions: {
    authenticate(tokens: AuthTokens) {
      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;
      this.status = 'authenticated';
      this.error = null;
    },
    refresh(accessToken: string) {
      this.accessToken = accessToken;
      this.status = 'authenticated';
    },
    setError(message: string) {
      this.error = message;
      this.status = 'error';
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.status = 'idle';
      this.error = null;
    },
  },
});

