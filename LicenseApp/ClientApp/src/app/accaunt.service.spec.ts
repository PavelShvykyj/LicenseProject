import { TestBed, inject } from '@angular/core/testing';

import { AccauntService } from './accaunt.service';

describe('AccauntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccauntService]
    });
  });

  it('should be created', inject([AccauntService], (service: AccauntService) => {
    expect(service).toBeTruthy();
  }));
});
