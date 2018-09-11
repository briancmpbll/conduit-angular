import { Errors } from './../core/models/errors.model';
import { User } from './../core/models/user.model';
import { AppAction, AppActionTypes } from './app.actions';
import { Injectable } from '@angular/core';

/**
 * Interface for the 'App' data used in
 *  - AppState, and
 *  - appReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface AppState {
  list: Entity[]; // list of App; analogous to a sql normalized table
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: any; // last none error (if any)

  currentUser: User;
  isAuthenticated?: boolean;
  loginSubmitting: boolean;
  loginErrors: Errors;
}

export const initialState: AppState = {
  list: [],
  loaded: false,

  currentUser: new User,
  loginSubmitting: false,
  loginErrors: new Errors
};

export function appReducer(
  state: AppState = initialState,
  action: AppAction
): AppState {
  switch (action.type) {
    case AppActionTypes.AppLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }

    case AppActionTypes.Login: {
      state = {
        ...state,
        loginErrors: new Errors,
        loginSubmitting: true
      };
      break;
    }

    case AppActionTypes.ExistingUserSuccess:
    case AppActionTypes.LoginSuccess: {
      state = {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loginSubmitting: false
      };
      break;
    }

    case AppActionTypes.LoginError: {
      state = {
        ...state,
        loginErrors: action.payload,
        loginSubmitting: false
      };
      break;
    }

    case AppActionTypes.LogoutSuccess: {
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
