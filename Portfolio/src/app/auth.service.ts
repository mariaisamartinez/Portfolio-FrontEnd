import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri= 'https://localhost:3000/api';
  token=any;
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    this.http.post(this.uri + '/authenticate', {email: email,password: password}).subscribe((resp: any) => {
      //Redireccioneamos al usuario a su perfil
      this.router.navigate(['profile']);
      //Guardamos el token en localStorage
      localStorage.setItem('auth_token', resp.token);
    })
  };


  //Para cerrar sesión eliminamos el token del localStorage
  logout() {
    localStorage.removeItem('token');
  }

  //Un servicio para verificar si existe la sesión
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}