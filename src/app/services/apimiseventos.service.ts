import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMisEventos } from 'src/environments/environment';
import { agregaMisEventos } from 'src/interfaces/IMisEventos';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApimiseventosService {

  constructor(private httpclient:HttpClient) { }


  getEventos(): Observable<IMisEventos[]>{
    return this.httpclient.get<IMisEventos[]>(`${environment.apiUrl}/mis_eventos`);//hay que filtrar por usuario
  }

  PostUsuario(misEventos: agregaMisEventos): Observable<agregaMisEventos> {
    return this.httpclient.post<agregaMisEventos>(`${environment.apiUrl}/mis_eventos`, misEventos);
  }

  EliminarMiEvento(MiEvento:any):Observable<IMisEventos>{
    return this.httpclient.delete<IMisEventos>(`${environment.apiUrl}/mis_eventos/${MiEvento.id}`);
  }

  getEventosPorUsuario(rut: string): Observable<agregaMisEventos[]> {
    return this.httpclient.get<agregaMisEventos[]>(`${environment.apiUrl}/mis_eventos?rut=${rut}`);
  }
}
