import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import { Avatar } from '../../../shared/models/avatar';
import { AvatarService } from '../../../shared/services/avatar.service';

@Component({
  selector: 'app-avatar-page',
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.css']
})
export class AvatarPageComponent {
  loading: boolean = false;
  avatars?: Avatar[] = [];
  
  constructor(
    private authService: AuthService,
    private avatarService: AvatarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAvatars();
  }

  loadAvatars() {
    this.loading = true;
    this.avatarService.getAvatarsByUser().subscribe({
      next: avatars => {
        this.avatars = avatars;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error('Observable emitted an error: ' + err);
      }
    });
  }

  onRegister(event: any) {
    this.router.navigate(['/users/register']);
  }

  onAdminVideos(event: any) {
    Swal.fire({
      title: "Introduzca el pin",
      input: "password",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value && result.value == this.authService.currentUserLog?.pin) {
          this.router.navigate(['/videos']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El pin ingresado es incorrecto",
          });
        }
      }
    });
  }

  onAvatar(avatar: Avatar) {
    Swal.fire({
      title: "Introduzca su pin de usuario",
      html:
        '<input type="password" id="swal-input1" class="swal2-input" placeholder="Pin">' +
        '<select id="swal-input2" class="swal2-select">' +
        '  <option value="user">User</option>' +
        '  <option value="avatar">Avatar</option>' +
        '</select>',
      showCancelButton: true,
      confirmButtonText: "Ingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        const pin = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        const user = (<HTMLInputElement>document.getElementById('swal-input2')).value;
        if (user === "user" && parseInt(pin, 10) === this.authService.currentUserLog?.pin) {
          this.router.navigate(['/users/edit'], { state: avatar });
        } else if (user === "avatar" && parseInt(pin, 10) === avatar.pin) {
          this.router.navigate(['/users/playlist'], { state: avatar });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El pin ingresado es incorrecto",
          });
        }
      }
    });
  }

  // Función para el nuevo botón "Agregar Playlist"
  onAddPlaylist(event: any) {
    // Aquí puedes agregar la lógica para el botón "Agregar Playlist"
    this.router.navigate(['/playlists']);
    

  }
}
