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
      return true;
    }).catch(() => {
      this.router.navigate(['/user/login']);
      return false;
    });
  }
}

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate(route, state);
};
