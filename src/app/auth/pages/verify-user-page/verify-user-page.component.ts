import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-user-page',
  templateUrl: './verify-user-page.component.html',
  styleUrl: './verify-user-page.component.css'
})
export class VerifyUserPageComponent {
  verifiedUser: boolean = false;
  loading: boolean = true;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.getUserId();
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  getUserId() {
    this.loading = true;
    this.route.params.subscribe({
      next: params =>{
        let id = +params['id'];
        this.verifyUser(id);
      },
      error: err =>{
        this.loading = false;
        console.error('Observable emitted an error: ' + err);
      } 
    })
  }

  verifyUser(id: number) {
    this.loading = true;
    this.authService.verifyUser(id).subscribe({
      next: value =>{
        console.log(value)
        this.verifiedUser = true;
        this.loading = false;
      },
      error: err =>{
        this.verifiedUser = false;
        this.loading = false;
        console.error('Observable emitted an error: ' + err);
      } 
    })
  }

}
