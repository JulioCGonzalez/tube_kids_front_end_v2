import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayList } from '../../../shared/models/playList';
import { PlayListService } from '../../../shared/services/play-list.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-register-play-list-page',
  templateUrl: './register-play-list-page.component.html',
  styleUrl: './register-play-list-page.component.css'
})
export class RegisterPlayListPageComponent {
  public registerForm: FormGroup = this.fb.group({
    name:[''],
    avatars:[''],
  });
  user?: User = undefined;
  playlistid:any;
  constructor( private fb: FormBuilder,
    private playlistService: PlayListService,
    private authService: AuthService,
    private router: Router){
      this.user = this.authService.currentUserLog;
    }

    onRegister(){
      if (this.registerForm.valid) {
        let Data: PlayList = this.registerForm.value;
        this.playlistService.registerPlayList(Data).subscribe({
          next: value =>{
            Swal.fire({
              title: "Listo!",
              text: "El playlist se registro correctamente!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok"
            }).then((result) => {
              this.router.navigate(['/playlists']);
            });
          },
          error: err => {
            console.error('Observable emitted an error: ' + err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El playlist no se pudo registrar",
            });
          }
        })
      }
    }

    onClickBack(event: any){
      this.router.navigate(['/playlists']);
    }
}
