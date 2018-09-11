import { Entity, ArticleState } from './article.reducer';
import { articleQuery } from './article.selectors';

describe('Article Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getArticleId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createArticle = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      article: {
        list: [
          createArticle('PRODUCT-AAA'),
          createArticle('PRODUCT-BBB'),
          createArticle('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Article Selectors', () => {
    it('getAllArticle() should return the list of Article', () => {
      const results = articleQuery.getAllArticle(storeState);
      const selId = getArticleId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedArticle() should return the selected Entity', () => {
      const result = articleQuery.getSelectedArticle(storeState);
      const selId = getArticleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = articleQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = articleQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
