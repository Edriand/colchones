import { Component } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent {
  user: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cognitoService: CognitoService) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    let email = this.activatedRoute.snapshot.paramMap.get('id');

    this.user.email = email ? email : '';
  }

  public confirmSignUp() {
    this.cognitoService.confirmSignUp(this.user).then(() => {
      this.router.navigate(['/user/login'])
    }).catch(() => {
      alert("¡Algo ha ido mal con la confirmación del registro!");
    });
  }
}
