import { Article } from './../../core/models/article.model';
import { Action } from '@ngrx/store';
import { Errors } from '../../core/models/errors.model';

export enum ArticleActionTypes {
  LoadArticle = '[Article] Load Article',
  ArticleLoaded = '[Article] Article Loaded',
  ArticleLoadError = '[Article] Article Load Error',
  ClearArticle = '[Article] Clear Article'
}

export class LoadArticleAction implements Action {
  readonly type = ArticleActionTypes.LoadArticle;
  constructor(public payload: string) {}
}

export class ArticleLoadErrorAction implements Action {
  readonly type = ArticleActionTypes.ArticleLoadError;
  constructor(public payload: Errors) {}
}

export class ArticleLoadedAction implements Action {
  readonly type = ArticleActionTypes.ArticleLoaded;
  constructor(public payload: Article) {}
}

export class ClearArticleAction implements Action {
  readonly type = ArticleActionTypes.ClearArticle;
}

export type ArticleAction = LoadArticleAction | ArticleLoadedAction | ArticleLoadErrorAction |
ClearArticleAction;

export const fromArticleActions = {
  LoadArticleAction,
  ArticleLoadedAction,
  ArticleLoadErrorAction
};
