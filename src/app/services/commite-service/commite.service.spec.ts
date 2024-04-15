import { TestBed } from '@angular/core/testing';

import { CommiteService } from './commite.service';

describe('CommiteService', () => {
  let service: CommiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
