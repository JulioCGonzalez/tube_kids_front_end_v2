import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AvatarService } from '../../../shared/services/avatar.service';
import { Avatar } from '../../../shared/models/avatar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-avatar',
  templateUrl: './register-avatar.component.html',
  styleUrls: ['./register-avatar.component.css']
})
export class RegisterAvatarComponent implements OnInit {
  public registerForm: FormGroup = this.fb.group({
    full_name: ['', [Validators.required, Validators.minLength(3)]], // Validación para el nombre
    pin: ['', [pinLengthValidator]], // Validación para el pin
    avatar: [''], // No es necesario Validators.required aquí
    age: ['', [Validators.required, Validators.max(15)]] // Cambio en la validación de edad
  });

  avatars: any[] =[];

  constructor(
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.avatars = [
      { name: 'Hombre', url: 'male.png' },
      { name: 'Mujer', url: 'female.png' },
    ];
  }

  get fg() {
    return this.registerForm.controls;
  }

  selectAvatar(avatarUrl: string) {
    this.registerForm.patchValue({ avatar: avatarUrl });
  }

  onRegister() {
    if (this.registerForm.valid) {
      let avatarData: Avatar = this.registerForm.value;
      avatarData.user_id = this.authService.currentUserLog?.id;
      this.avatarService.registerAvatar(avatarData).subscribe({
        next: value => {
          Swal.fire({
            title: 'Listo!',
            text: 'El avatar se registró correctamente!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            this.router.navigate(['/users/avatar']);
          });
        },
        error: err => {
          console.error('Observable emitted an error: ' + err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El avatar no se pudo registrar',
          });
        }
      });
    }
  }
}

function pinLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const pin = control.value;
  if (pin && pin.toString().length !== 6) {
    return { 'invalidPinLength': true };
  }
  return null;
}
