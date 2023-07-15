import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
}
)
class PermissionsService {
  constructor(private cognitoService: CognitoService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.cognitoService.isAuthentichated().then(() => {
      this.router.navigate(['/app/home']);
      return false;
    }).catch(() => {
      return true;
    });
  }
}

export const redirectGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate(route, state);
};
