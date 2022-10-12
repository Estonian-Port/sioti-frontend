import { TestBed } from '@angular/core/testing';

import { OnOffService } from './on-off.service';

describe('OnOffService', () => {
  let service: OnOffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnOffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
