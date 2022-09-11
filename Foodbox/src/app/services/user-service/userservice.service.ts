import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interface/User';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  public addUser(user:User): Observable<User>{
    return this.http.post<User>(`${baseUrl}/user/`,user); 
  }
}
