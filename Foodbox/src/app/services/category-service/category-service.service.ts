import { Category } from './../../interface/Category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({ 
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http:HttpClient) { }

  public getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(`${baseUrl}/category/`);
  }

  public addCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(`${baseUrl}/category/`,category);
  }

  public getCategoryById(id:number):Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/category/${id}`);
  }

  public updateEmployee(id:number, category:Category) :Observable<Object> {
    return this.http.put(`${baseUrl}/category/${id}`,category);
  }

  public deleteCategory(id:number):Observable<Object>{
    return this.http.delete(`${baseUrl}/category/${id}`);
  }
}
