import { Article } from './../../core/models/article.model';
import { ArticleAction, ArticleActionTypes } from './article.actions';
import { Errors } from '../../core/models/errors.model';

export interface ArticleState {
  article?: Article;
  selectedId?: string; // which Article record has been selected
  loaded: boolean; // has the Article been loaded
  errors?: Errors; // last none error (if any)
}

export const initialState: ArticleState = {
  loaded: false
};

export function articleReducer(
  state: ArticleState = initialState,
  action: ArticleAction
): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.LoadArticle: {
      state = {
        ...state,
        selectedId: action.payload
      };
      break;
    }

    case ArticleActionTypes.ArticleLoaded: {
      state = {
        ...state,
        article: action.payload,
        loaded: true
      };
      break;
    }

    case ArticleActionTypes.ArticleLoadError: {
      state = {
        ...state,
        errors: action.payload
      };
      break;
    }

    case ArticleActionTypes.ClearArticle: {
      state = {
        ...initialState
      };
      break;
    }

  }
  return state;
}
