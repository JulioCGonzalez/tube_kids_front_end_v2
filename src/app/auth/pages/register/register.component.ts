import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

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
            this.router.navigate(['/auth/login']);
          },
          error: err => console.error('Observable emitted an error: ' + err),
        })
      }
     
    }
}
