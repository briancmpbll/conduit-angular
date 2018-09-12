import { User } from '../../core/models/user.model';
import { Errors } from '../../core/models/errors.model';
import { AuthAction, AuthActionTypes } from './auth.actions';

export interface AuthState {
  currentUser: User;
  isAuthenticated?: boolean;
  loginSubmitting: boolean;
  loginErrors: Errors;
}

export const initialState: AuthState = {
  currentUser: new User,
  loginSubmitting: false,
  loginErrors: new Errors
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      state = {
        ...state,
        loginErrors: new Errors,
        loginSubmitting: true
      };
      break;
    }

    case AuthActionTypes.ExistingUserSuccess:
    case AuthActionTypes.LoginSuccess: {
      state = {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loginSubmitting: false
      };
      break;
    }

    case AuthActionTypes.LoginError: {
      state = {
        ...state,
        loginErrors: action.payload,
        loginSubmitting: false
      };
      break;
    }

    case AuthActionTypes.LogoutSuccess: {
      state = {
        ...state,
        currentUser: new User,
        isAuthenticated: false
      };
      break;
    }
  }
  return state;
}
