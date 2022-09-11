import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from '../helper';
import { Purchase } from 'src/app/interface/Purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServicesService {

  constructor(private http:HttpClient) { }

  createOrder(purchase: Purchase) : Observable<any>{
     return this.http.post<Purchase>(`${baseUrl}/checkout/`,purchase);
  }
}
