import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEventos } from 'src/interfaces/IEventos';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpClient: HttpClient) { }

  getEventos(): Observable<IEventos[]>{
    return this.httpClient.get<IEventos[]>(`${environment.apiUrl}/eventos`);//filtrar por usuario
  }

  private eventosGuardados: any[] = [];
  
  agregarEvento(evento: any): void {
    this.eventosGuardados.push(evento);
  }

  obtenerEventos(): any[] {
    return this.eventosGuardados;
  }

}
