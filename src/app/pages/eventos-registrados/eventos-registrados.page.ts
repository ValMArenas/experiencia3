import { Component, OnInit } from '@angular/core';
import { ApimiseventosService } from 'src/app/services/apimiseventos.service';
import { verMisEventos } from 'src/interfaces/IMisEventos';

@Component({
  selector: 'app-eventos-registrados',
  templateUrl: './eventos-registrados.page.html',
  styleUrls: ['./eventos-registrados.page.scss'],
})
export class EventosRegistradosPage implements OnInit {

  misEventos: verMisEventos[] = [];

  constructor(private miapi: ApimiseventosService) {}

  ngOnInit() {
    const rutUsuario = sessionStorage.getItem('rut');

    if (rutUsuario) {
      this.miapi.getEventos().subscribe((data: verMisEventos[]) => {
        this.misEventos = data.filter(evento => evento.rut === rutUsuario);
      });
    }
  }
}
