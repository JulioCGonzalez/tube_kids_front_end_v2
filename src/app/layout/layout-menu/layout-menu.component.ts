import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from './menu.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrl: './layout-menu.component.css'
})
export class LayoutMenuComponent implements OnInit {

  items: MenuItem[] = [];
  currentUser: User | undefined = undefined;
  userSubscription: Subscription | undefined;
  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.items = this.menuService.getMenu(this.currentUser);
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.items = this.menuService.getMenu(this.currentUser);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onClickLogin(event:any){
    if(this.currentUser){
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/home']);
        }
      })
    }else{
      this.router.navigate(['/auth']);
    }

    // this.loginDialog.showDialog();
  }

  onSignIn(event:any){
    this.authService.login('l.miranda@gmail.com', '123456789').subscribe(
      (response) => {
        // Handle successful login response
        console.log('Login successful', response);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
  

}
