import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';
import { LoginRegistroGuard } from './guards/login-registro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule), canActivate: [LoginRegistroGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LoginRegistroGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'editar-perfil/:id',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'registro-evento',
    loadChildren: () => import('./pages/registro-evento/registro-evento.module').then( m => m.RegistroEventoPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'eventos-registrados',
    loadChildren: () => import('./pages/eventos-registrados/eventos-registrados.module').then( m => m.EventosRegistradosPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'detalle-evento',
    loadChildren: () => import('./pages/detalle-evento/detalle-evento.module').then( m => m.DetalleEventoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
