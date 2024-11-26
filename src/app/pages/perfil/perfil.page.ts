import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IAsistentes } from '../../../interfaces/IUsuarios';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: IAsistentes | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router:Router
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

  editarUsuario() {
    if (this.usuario) {
      this.router.navigate(['/editar-perfil', this.usuario.id]);
    }
  }
}
