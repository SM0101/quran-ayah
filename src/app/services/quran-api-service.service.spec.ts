import { TestBed } from '@angular/core/testing';

import { QuranApiServiceService } from './quran-api-service.service';

describe('QuranApiServiceService', () => {
  let service: QuranApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuranApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
