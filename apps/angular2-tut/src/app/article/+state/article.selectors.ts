import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article.reducer';

// Lookup the 'Article' feature state managed by NgRx
const getArticleState = createFeatureSelector<ArticleState>('article');

const getLoaded = createSelector(
  getArticleState,
  (state: ArticleState) => state.loaded
);
const getErrors = createSelector(
  getArticleState,
  (state: ArticleState) => state.errors
);

const getArticle = createSelector(
  getArticleState,
  getLoaded,
  (state: ArticleState, isLoaded) => {
    return isLoaded ? state.article : undefined;
  }
);

export const articleQuery = {
  getLoaded,
  getErrors,
  getArticle
};
