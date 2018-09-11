import { ArticleLoadedAction } from './article.actions';
import {
  ArticleState,
  Entity,
  initialState,
  articleReducer
} from './article.reducer';

describe('Article Reducer', () => {
  const getArticleId = it => it['id'];
  let createArticle;

  beforeEach(() => {
    createArticle = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Article actions ', () => {
    it('should return set the list of known Article', () => {
      const articles = [
        createArticle('PRODUCT-AAA'),
        createArticle('PRODUCT-zzz')
      ];
      const action = new ArticleLoadedAction(articles);
      const result: ArticleState = articleReducer(initialState, action);
      const selId: string = getArticleId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = articleReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
