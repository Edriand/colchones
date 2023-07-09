import { Component } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isConfirm: boolean;
  user: User;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.isConfirm = false;
    this.user = {} as User;
  }

  public signUp() {
    this.cognitoService.signUp(this.user).then(() => {
      this.isConfirm = true;
    }).catch(() => {
      alert("¡Algo ha ido mal con el registro!");
    });
  }

  public confirmSignUp() {
    this.cognitoService.signUp(this.user).then(() => {
      this.router.navigate(['/user/login'])
    }).catch(() => {
      alert("¡Algo ha ido mal con la confirmación del registro!");
    });
  }
}