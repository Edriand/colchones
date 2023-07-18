import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User;

  constructor(private router: Router, private cognitoService: CognitoService, private userService: UserService){
    this.user = userService.getUser();
  }

  signIn() {
    if(this.userService.checkLogin(this.user))
      this.cognitoService.signIn(this.user).then(() => {
        this.router.navigate(['/app/home']);
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'Algo ha ido mal con el inicio de sesión'
        });
      });
  }
}
