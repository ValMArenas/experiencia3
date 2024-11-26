import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from '../../services/apicrud.service';
import { AuthService } from '../../services/auth.service';
import { ApimiseventosService } from '../../services/apimiseventos.service';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.page.html',
  styleUrls: ['./detalle-evento.page.scss'],
})
export class DetalleEventoPage implements OnInit {

  unEvento: any;
  qrdata: any;
  rut: any;
  email: any;

  misEventos = {
    imagen: "",
    nombre: "",
    fecha: "",
    rut: "",
    email: ""
  }

  eventito = {
    id: "",
    imagen: "",
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: ""
  }

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private alertcontroller: AlertController,
    private apicrud: ApicrudService,
    private authservice: AuthService,
    private miapi: ApimiseventosService
  ) { 
    this.activated.queryParams.subscribe(params => {
      this.unEvento = JSON.parse(params['eventos']);
    });
    this.qrdata = '';
    this.rut = sessionStorage.getItem('rut');
    this.email = sessionStorage.getItem('email');
  }

  ngOnInit() {
    this.eventito = this.unEvento;
  }

  generarQr() {
    this.qrdata = '';
    this.qrdata = `${this.unEvento.imagen} ${this.unEvento.nombre} ${this.unEvento.fecha} ${this.rut} ${this.email}`;
    console.log(this.qrdata);
    this.verificarRegistro();
  }

  // Verificar si el usuario ya está registrado en este evento
  verificarRegistro() {
    this.miapi.getEventosPorUsuario(this.rut).subscribe(eventosRegistrados => {
      const yaRegistrado = eventosRegistrados.some(evento => evento.nombre === this.unEvento.nombre);
      
      if (yaRegistrado) {
        this.mostrarMensaje('Ya estás registrado en este evento');
      } else {
        this.guardarMiEvento();  // Si no está registrado, proceder a guardar
      }
    }, error => {
      console.error('Error al verificar los eventos registrados:', error);
      this.mostrarMensaje('Hubo un error al verificar los eventos registrados');
    });
  }

  guardarMiEvento() {
    this.misEventos.imagen = this.unEvento.imagen;
    this.misEventos.nombre = this.unEvento.nombre;
    this.misEventos.fecha = this.unEvento.fecha;
    this.misEventos.rut = this.rut;
    this.misEventos.email = this.email;

    this.miapi.PostUsuario(this.misEventos).subscribe(response => {
      console.log('Evento guardado:', response);
      this.mostrarMensaje('Evento guardado exitosamente');
    }, error => {
      console.error('Error guardando evento:', error);
      this.mostrarMensaje('Hubo un error al guardar el evento');
    });
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertcontroller.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
