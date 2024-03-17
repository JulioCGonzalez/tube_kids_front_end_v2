import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, tap } from 'rxjs';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  return authService.me()
  .pipe(
    tap( isAuthenticated => {
      if( !isAuthenticated){
        router.navigate(['/auth/login'])
      }
    } )
  )
};
