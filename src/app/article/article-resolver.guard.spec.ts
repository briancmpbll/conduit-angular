import { TestBed, async, inject } from '@angular/core/testing';

import { ArticleResolverGuard } from './article-resolver.guard';

describe('ArticleResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleResolverGuard]
    });
  });

  it('should ...', inject([ArticleResolverGuard], (guard: ArticleResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
