import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarService } from '../../../shared/services/avatar.service';
import { Avatar } from '../../../shared/models/avatar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-avatar',
  templateUrl: './register-avatar.component.html',
  styleUrl: './register-avatar.component.css'
})
export class RegisterAvatarComponent {
  public registerForm: FormGroup = this.fb.group({
    full_name:[''],
    pin:[''],
    avatar:[''],
    age:['']
  });

  constructor( private fb: FormBuilder,
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router){}

    onRegister(){
      if (this.registerForm.valid) {
        let avatarData: Avatar = this.registerForm.value;
        avatarData.user_id = this.authService.currentUserLog?.id;
        this.avatarService.registerAvatar(avatarData).subscribe({
          next: value =>{
            Swal.fire({
              title: "Listo!",
              text: "El avatar se registro correctamente!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok"
            }).then((result) => {
              this.router.navigate(['/users/avatar']);
            });
          },
          error: err => {
            console.error('Observable emitted an error: ' + err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El avatar no se pudo registrar",
            });
          }
        })
      }
     
    }
}
