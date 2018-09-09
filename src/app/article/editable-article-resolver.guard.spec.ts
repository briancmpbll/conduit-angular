import { TestBed, async, inject } from '@angular/core/testing';

import { EditableArticleResolverGuard } from './editable-article-resolver.guard';

describe('EditableArticleResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditableArticleResolverGuard]
    });
  });

  it('should ...', inject([EditableArticleResolverGuard], (guard: EditableArticleResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
