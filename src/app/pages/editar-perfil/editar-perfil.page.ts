import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IAsistentes } from 'src/environments/environment';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss']
})
export class EditarPerfilPage implements OnInit {
  usuario: IAsistentes = {
    id: '',
    avatar:'',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    username: '',
    rut: '',
    password: '',
    isactive: true
  };
 

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.authService.getUserById(userId).subscribe(
        (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.usuario = data[0];
          }
        }
      );
    } 
  }

  guardarCambios() {
    this.authService.ActualizarUsuario(this.usuario).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/perfil']);
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }

  async selectPhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (photo?.dataUrl && this.usuario) {
        this.usuario.avatar = photo.dataUrl; // Actualizar la foto localmente
      }
    } catch (error) {
      console.error('Error seleccionando la foto:', error);
    }
  }

  savePhoto() {
    if (this.usuario) {
      this.authService.ActualizarUsuario(this.usuario).subscribe({
        next: () => {
          console.log('Foto actualizada correctamente');
        },
        error: err => {
          console.error('Error al guardar cambios:', err);
        },
      });
    }
  }
}
