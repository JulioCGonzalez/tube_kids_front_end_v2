import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router){}

  onLogin(){
    this.authService.login(this.logInForm.value.email, this.logInForm.value.password).subscribe({
      next: value =>{
        this.router.navigate(['/users/avatar']);
      },
      error: err => console.error('Observable emitted an error: ' + err),
    })
  }

  onRgister(event: any){
    this.router.navigate(['/auth/register']);
  }

 

}
