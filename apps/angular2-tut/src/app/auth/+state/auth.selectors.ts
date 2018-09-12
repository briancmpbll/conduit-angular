import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>('auth');

const getCurrentUser = createSelector(
  getAuthState,
  (state: AuthState) => state.currentUser
);

const getIsAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => Boolean(state.isAuthenticated)
);

const getLoginErrors = createSelector(
  getAuthState,
  (state: AuthState) => state.loginErrors
);

const getLoginSubmitting = createSelector(
  getAuthState,
  (state: AuthState) => state.loginSubmitting
);

export const authQuery = {
  getCurrentUser,
  getIsAuthenticated,
  getLoginErrors,
  getLoginSubmitting
};
