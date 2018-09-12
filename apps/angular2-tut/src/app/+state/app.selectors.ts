import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

// Lookup the 'App' feature state managed by NgRx
const getAppState = createFeatureSelector<AppState>('app');

const getLoaded = createSelector(
  getAppState,
  (state: AppState) => state.loaded
);
const getError = createSelector(getAppState, (state: AppState) => state.error);

const getAllApp = createSelector(
  getAppState,
  getLoaded,
  (state: AppState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getAppState,
  (state: AppState) => state.selectedId
);
const getSelectedApp = createSelector(getAllApp, getSelectedId, (app, id) => {
  const result = app.find(it => (it as any).id === id);
  return result ? Object.assign({}, result) : undefined;
});

export const appQuery = {
  getLoaded,
  getError,
  getAllApp,
  getSelectedApp
};
