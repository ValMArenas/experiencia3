import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { IAsistentes } from 'src/interfaces/IUsuarios';
import { register } from 'swiper/element/bundle';

register();

interface Opciones{
  icon:string;
  name:string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  opciones: Opciones[]=[
    {
      icon: 'person-circle-sharp',
      name: 'Ver perfil',
      redirecTo: '/perfil'
    },
    {
      icon: 'bookmark-sharp',
      name: 'Mis eventos',
      redirecTo: '/eventos-registrados'
    },
    {
      icon: 'log-out-sharp',
      name: 'Cerrar sesión',
      redirecTo: ''
    },
  ]

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  usuarios: IAsistentes[]=[];

  logout() {
    this.authService.logout();
  }

  cerrarSesion(opcion: Opciones) {
    if (opcion.name === 'Cerrar sesión') {
      this.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([opcion.redirecTo]);
    }
  }
}