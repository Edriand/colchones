import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    });
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
    return Auth.signIn(user.username, user.password);
  }

  public signOut(): Promise<any> {
    return Auth.signOut();
  }

  public forgotPassword(user: User): Promise<any> {
    return Auth.forgotPassword(user.username);
  }

  public forgotPasswordSubmit(user: User): Promise<any> {
    return Auth.forgotPasswordSubmit(user.username, user.code, user.password)
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public isAuthentichated(): Promise<any> {
    return Auth.currentAuthenticatedUser();
  }
}
