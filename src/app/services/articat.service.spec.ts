import { TestBed } from '@angular/core/testing';

import { ArticatService } from './articat.service';

describe('ArticatService', () => {
  let service: ArticatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
