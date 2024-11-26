import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginRegistroGuard } from './login-registro.guard';

describe('loginRegistroGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginRegistroGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
