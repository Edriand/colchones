import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        email: user.email,
        nickname: user.username
      }
    });
  }

  public confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.username, user.code);
  }

  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.username, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public isAuthentichated(): Promise<boolean> {
    if (this.authenticationSubject.value)
      return Promise.resolve(true);

    return this.getUser().then((user:any) => {
      return user ? true : false
    }).catch(() => {
      return false;
    });
  }
}
