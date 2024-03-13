import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription, distinctUntilChanged, map, tap } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  selectedItem!: number;
  private sub?: Subscription;
  private user?: User | undefined;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  

  getMenu(user: User | undefined): any[]{
    const isUserAuth = user !== undefined;
    return [
      {label: 'Usuarios', icon: 'pi pi-fw pi-user', visible:isUserAuth, routerLink: ['/users']},
    ]
  }
}
