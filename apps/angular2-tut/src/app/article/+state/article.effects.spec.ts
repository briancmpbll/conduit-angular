import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { ArticleEffects } from './article.effects';
import { LoadArticleAction, ArticleLoadedAction } from './article.actions';

describe('ArticleEffects', () => {
  let actions: Observable<any>;
  let effects: ArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        ArticleEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ArticleEffects);
  });

  describe('loadArticle$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadArticleAction() });
      expect(effects.loadArticle$).toBeObservable(
        hot('-a-|', { a: new ArticleLoadedAction([]) })
      );
    });
  });
});
