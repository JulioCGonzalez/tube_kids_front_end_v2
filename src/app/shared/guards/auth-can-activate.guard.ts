import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if(authService.currentUserLog){
    return true;
  }
  return false;
};
