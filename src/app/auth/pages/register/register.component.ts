import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    name:[''],
    email:[''],
    password:[''],
    last_name:[''],
    country:[''],
    birth_date:[''],
    pin:[''],
  });

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){}


    onRegister(){
      if (this.registerForm.valid) {
        const userData: User = this.registerForm.value;
        console.log(userData)
        this.authService.register(userData).subscribe({
          next: value =>{
            Swal.fire({
              title: "Listo!",
              text: "El usuario se registro correctamente!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok"
            }).then((result) => {
              this.router.navigate(['/auth/login']);
            });
          },
          error: err =>{
            console.error('Observable emitted an error: ' + err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se ha podido registrar el usuario.",
            });
          }
        })
      }
     
    }
}
