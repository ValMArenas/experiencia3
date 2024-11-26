import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { IEvento, IEventos } from 'src/interfaces/IEventos';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventos: IEventos[]=[];

  constructor(private menuController: MenuController,
              private alertcontroller: AlertController,
              private router: Router,
              private apicrud: ApicrudService) { }

  ngOnInit() {
    this.apicrud.getEventos().subscribe((data)=>{
      this.eventos = data;
    })
  }

async registrarEvento(){
    const alert = await this.alertcontroller.create({
      header: '¿Estás seguro de registrarte a este evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Registro de evento cancelado.');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Evento registrado con éxito.');
            this.router.navigate(['/eventos-registrados'])
          },
        },
      ],
    });

    await alert.present();
}

  mostrarMenu(){
    this.menuController.open('first');
  }

  buscarEvento(Observable:IEventos){
    this.router.navigate(['/detalle-evento'],
      {queryParams:{eventos: JSON.stringify(Observable)}})
  }
}
