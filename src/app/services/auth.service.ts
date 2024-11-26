import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsistentes, nuevoAsistente } from 'src/interfaces/IUsuarios';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient, private router: Router) {}

  GetAllUsers(): Observable<IAsistentes[]> {
    return this.httpclient.get<IAsistentes[]>(`${environment.apiUrl}/asistentes`);
  }

  GetUsersByUsername(username: string): Observable<IAsistentes> {
    return this.httpclient.get<IAsistentes>(`${environment.apiUrl}/asistentes/?username=${username}`);
  }  

  IsLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  PostUsuario(userNuevo: nuevoAsistente): Observable<nuevoAsistente> {
    return this.httpclient.post<nuevoAsistente>(`${environment.apiUrl}/asistentes`, userNuevo);
  }

  getUserById(id: string): Observable<IAsistentes> {
    return this.httpclient.get<IAsistentes>(`${environment.apiUrl}/asistentes/?id=${id}`);
  }

  ActualizarUsuario(usuario: any): Observable<IAsistentes> {
    return this.httpclient.put<IAsistentes>(`${environment.apiUrl}/asistentes/${usuario.id}`, usuario);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
