import { TestBed } from '@angular/core/testing';

import { ApimiseventosService } from './apimiseventos.service';

describe('ApimiseventosService', () => {
  let service: ApimiseventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApimiseventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
