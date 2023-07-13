import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  user: User;

  constructor(private router: Router, private cognitoService: CognitoService, private userService: UserService) {
    this.user = userService.getUser();
  }

  public forgotPassword() {
    this.cognitoService.forgotPassword(this.user).then(() => {
      this.router.navigate([`/user/confirm-password/${this.user.username}`])
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: 'Algo ha ido mal con el reinicio de contraseña'
      });
    });;
  }
}
