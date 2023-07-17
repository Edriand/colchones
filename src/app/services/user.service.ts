import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() { 
    this.user = {
      email: '',
      password: '',
      passwordC: '',
      username: '',
      code: ''
    }
  }

  public checkValuesRegister(user: User) {
    if((user.email.trim() != '') && (user.username.trim() != '')
        && (user.password.trim() != '') && (user.passwordC.trim() != ''))
      return true;

    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'Faltan datos por rellenar'
    });
        
    return false;
  }

  public checkValuesConfirmRegister(user: User) {
    if((user.username.trim() != '') && (user.code.trim() != ''))
      return true;

    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'Faltan datos por rellenar'
    });
        
    return false;
  }

  public checkVoidsRegister(user: User) {
    if (!user.email.includes(' ') && (!user.username.includes(' '))
        && (!user.password.includes(' ')) && (!user.passwordC.includes(' ')))
      return true;

    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'No se admiten espacios en los campos a rellenar'
    });

    return false;
  }

  public checkVoidConfirmRegister(user: User) {
    if (!user.username.includes(' ') && (!user.code.includes(' ')))
      return true;

    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'No se admiten espacios en los campos a rellenar'
    });

    return false;
  }
  
  public comparePasswords(user: User) {
    if(user.password.trim() === user.passwordC.trim())
      return true;

    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'La contraseñas deben de coincidir'
    });

    return false;
  }

  public checkLengthPassword(user: User) {
    if(user.password.trim().length >= 8)
      return true; 
      
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'La contraseña debe de tener al menos 8 carácteres'
    });

    return false;
  }

  
  public checkLengthCode(user: User) {
    if(user.code.trim().length === 6)
      return true; 
      
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'El código debe de tener al menos 6 carácteres'
    });

    return false;
  }

  public getUser() {
    return {...this.user};
  }
}
