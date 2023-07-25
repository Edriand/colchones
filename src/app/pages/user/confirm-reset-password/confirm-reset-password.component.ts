import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cognitoService: CognitoService, private userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    let username = this.activatedRoute.snapshot.paramMap.get('id');

    this.user.username = username ? username : '';
  }

  public forgotPasswordSubmit() {
    if(this.userService.checkConfirmResetPassword(this.user))
      this.cognitoService.forgotPasswordSubmit(this.user).then(() => {
        this.router.navigate(['/user/login'])
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'Algo ha ido mal con el reinicio de contraseña'
        });
      });
  }
}
