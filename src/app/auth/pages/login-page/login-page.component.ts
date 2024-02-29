import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public logInForm: FormGroup = this.fb.group({
    email:[''],
    password:['']
  })

  constructor( private fb: FormBuilder,
    private authService: AuthService){}

  onLogin(){
    this.authService.login(this.logInForm.value.email, this.logInForm.value.password).subscribe({
      next: value =>{
        console.log('Observable emitted the next value: ' + value)
      },
      error: err => console.error('Observable emitted an error: ' + err),
    })
  }

}
