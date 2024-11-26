import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { nuevoAsistente } from '../../../interfaces/IUsuarios';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;
  
  nuevoUsuario: nuevoAsistente={
    avatar: "",
    username:"",
    rut:"",
    nombre:"",
    apellido_paterno:"",
    apellido_materno:"",
    email:"",
    password:"",
    isactive:false
  }

  userdata: any;

  constructor(private authservice: AuthService,
              private router: Router,
              private alertcontroller: AlertController,
              private fbuilder: FormBuilder) {
                this.registroForm = fbuilder.group({
                  'username': new FormControl("", [Validators.required, Validators.minLength(6)]),
                  'rut': new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'nombre': new FormControl("", [Validators.required, Validators.minLength(3)]),
                  'apellido_paterno': new FormControl("", [Validators.required, Validators.minLength(3)]),
                  'apellido_materno': new FormControl("", [Validators.required, Validators.minLength(3)]),
                  'email':new FormControl("", [Validators.required, Validators.email]),
                  'password': new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
                  
                  })

              }

  ngOnInit() {
  }

  crearUsuario(){
    if(this.registroForm.valid){
      this.authservice.GetUsersByUsername(this.registroForm.value.usernam).subscribe(resp=>{
        this.userdata = resp;
        if(this.userdata.lenght>0){
          this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.username = this.registroForm.value.username;
          this.nuevoUsuario.rut = this.registroForm.value.rut;
          this.nuevoUsuario.nombre = this.registroForm.value.nombre;
          this.nuevoUsuario.apellido_paterno = this.registroForm.value.apellido_paterno;
          this.nuevoUsuario.apellido_materno = this.registroForm.value.apellido_materno;
          this.nuevoUsuario.email = this.registroForm.value.email;
          this.nuevoUsuario.password = this.registroForm.value.password;
          this.nuevoUsuario.isactive = true;
          this.authservice.PostUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted'+ this.nuevoUsuario.username+' ya esta registrad@',
      buttons:['OK']
    });
    alerta.present();
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'usuario creado',
      message: 'bienvenid@!'+ this.nuevoUsuario.username,
      buttons:['OK']
    });
    alerta.present();
    
  }
}
