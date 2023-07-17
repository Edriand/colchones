import { Component } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User;
  
  constructor(private router: Router, private cognitoService: CognitoService, private userService: UserService) {
    this.user = this.userService.getUser();
  }

  public signUp() {
    if(this.userService.checkVoidsRegister(this.user) && this.userService.checkVoidConfirmRegister(this.user) && this.userService.checkValuesRegister(this.user) && this.userService.checkLengthPassword(this.user) && this.userService.comparePasswords(this.user))
      this.cognitoService.signUp(this.user).then(() => {
        this.router.navigate([`/user/confirm-user/${this.user.username}`]);
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'Algo ha ido mal con el registro'
        });
      });
  }
}