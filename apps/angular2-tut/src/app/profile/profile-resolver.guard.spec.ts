import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileResolverGuard } from './profile-resolver.guard';

describe('ProfileResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileResolverGuard]
    });
  });

  it('should ...', inject([ProfileResolverGuard], (guard: ProfileResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
