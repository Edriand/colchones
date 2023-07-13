import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { CognitoService } from 'src/app/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css']
})
export class ConfirmResetPasswordComponent {
  user: User;

  constructor(private router: Router, private cognitoService: CognitoService, private userService: UserService) {
    this.user = userService.getUser();
  }

  public forgotPasswordSubmit() {
    this.cognitoService.forgotPasswordSubmit(this.user).then(() => {
      this.router.navigate(['/user/login'])
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: 'Algo ha ido mal con el reinicio de contraseña'
      });
    });;
  }
}
