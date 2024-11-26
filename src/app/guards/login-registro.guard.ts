import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginRegistroGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLogged = this.authService.IsLoggedIn(); 
    console.log('CanActivate Guard: isLoggedIn =', isLogged);

    if (isLogged) {
      console.log('Usuario autenticado. Redirigiendo a /eventos.');
      return this.router.createUrlTree(['/eventos']);
    }

    console.log('Usuario no autenticado. Permitiendo acceso a login o registro.');
    return true;
  }
}

