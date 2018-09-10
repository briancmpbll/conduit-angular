import { TestBed, async, inject } from '@angular/core/testing';

import { HomeAuthResolverGuard } from './home-auth-resolver.guard';

describe('HomeAuthResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeAuthResolverGuard]
    });
  });

  it('should ...', inject([HomeAuthResolverGuard], (guard: HomeAuthResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
