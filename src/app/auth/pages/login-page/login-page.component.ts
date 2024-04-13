import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
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
    private router: Router,
    private http: HttpClient){}

  onLogin(){
    debugger
    this.authService.login(this.logInForm.value.email, this.logInForm.value.password).subscribe({
      next: value =>{
        this.authService.me().subscribe({
          next: value =>{
            debugger
            this.lookupCodeUser();
          },
          error: err => console.error('Observable emitted an error: ' + err),
        });
      },
      error: err => console.error('Observable emitted an error: ' + err),
    })
  }

  onRgister(event: any){
    this.router.navigate(['/auth/register']);
  }

  // lookupCodeUser() {
  //   Swal.fire({
  //     title: "Introduzca su codigo",
  //     input: "text",
  //     inputAttributes: {
  //       autocapitalize: "off"
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: "Look up",
  //     showLoaderOnConfirm: true,
  //     preConfirm: async (login) => {
  //       try {
  //         const githubUrl = `http://localhost:80/api/checkuser/${this.authService.currentUserLog?.id}/code/${login}`;
  //         const response = await fetch(githubUrl);
  //         if (!response.ok) {
  //           return Swal.showValidationMessage(`El codigo es incorrecto
  //           `);
  //         }
  //         return response.json();
  //       } catch (error) {
  //         console.log(error)
  //         Swal.showValidationMessage(`
  //           Request failed: ${error}
  //         `);
  //       }
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.router.navigate(['/users/avatar']);
  //     }else{
  //       this.router.navigate(['/auth/login']);
  //     }
  //   });
  // }

  async lookupCodeUser() {
    const { value: login } = await Swal.fire({
      title: 'Introduzca su codigo',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const apiUrl = `http://localhost:80/api/checkuser/${this.authService.currentUserLog?.id}/code/${login}`;
          const response = await this.http.post(apiUrl, {}).toPromise(); // Perform POST request
          return response;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (login) {
      // If user confirmed
      this.router.navigate(['/users/avatar']);
    } else {
      // If user canceled
      this.router.navigate(['/auth/login']);
    }
  }

}
