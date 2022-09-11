import { OrderHistory } from './../../interface/OrderHistory';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryServiceService {
    private orderUrl = 'http://localhost:8080/api/orders';
  constructor(private http: HttpClient) { }

  getOrdersHistory(theEmail:string) : Observable<any>{
    return this.http.get(`${baseUrl}/checkout/order/${theEmail}`);
  }

  getOrderItem(id:number): Observable<any>{
    return this.http.get(`${baseUrl}/checkout/${id}`);
  }
 }


