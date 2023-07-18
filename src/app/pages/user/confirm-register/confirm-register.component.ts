import { Component } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent {
  user: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
              private cognitoService: CognitoService, private userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    let username = this.activatedRoute.snapshot.paramMap.get('id');

    this.user.username = username ? username : '';
  }

  public confirmSignUp() {
    if(this.userService.checkConfirmRegister(this.user))
      this.cognitoService.confirmSignUp(this.user).then(() => {
        this.router.navigate(['/user/login'])
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'Algo ha ido mal con la confirmación del registro'
        });
      });
  }
}
