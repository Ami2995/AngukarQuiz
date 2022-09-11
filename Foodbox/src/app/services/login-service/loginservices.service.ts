import { login } from './../../interface/Login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginservicesService {

  
  private tokenExpirationTimer: any;

  private tokenExpiration: any;

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public generateToken(login:login){
    return this.http.post(`${baseUrl}/generate-token`,login)
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //login user: set token in localStorage

  public loginUser(token:string){
     localStorage.setItem('token', token);
  }

  public isLoggedIn(){
    let tokens = localStorage.getItem('token');
    if(tokens == undefined || tokens == '' || tokens == null){
      return false;
    }else{
      return true;
    }
  }

  public logOut(){
    this.loginStatusSubject.next(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('Cart');
  }

  public getToken (){
    return localStorage.getItem('token');
  }

  public saveUserDetails(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserDetails(){
    let userData = localStorage.getItem('user');
    if(userData != null){
      return JSON.parse(userData);
    }else{
      this.logOut();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUserDetails();
    return user.authorities[0].authority;
  }
}
