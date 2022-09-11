import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Items } from 'src/app/interface/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemservicesService {
  
  constructor(private http:HttpClient) { }

  getFoodItems():Observable<Items[]>{
     return this.http.get<Items[]>(`${baseUrl}/food/`);
  }

  public addFoodItems(food:FormData): Observable<any>{
    return this.http.post<FormData>(`${baseUrl}/food/`,food);
  }
  
  public downloadFile(food:Items){
    let fileName = food.foodImage.substring(food.foodImage.lastIndexOf('\\')+1);
    return this.http.get(`${baseUrl}/food/download/${fileName}`,{
      responseType:'blob'
    })
  }

  public getItemsById(id:number) : Observable<Items>{
    return this.http.get<Items>(`${baseUrl}/food/${id}`);
  }

  public deleteItem(id:number): Observable<Object> {
    return this.http.delete(`${baseUrl}/food/${id}`);
  }
  
  public updateItem(food:Items) : Observable<Items> {
    return this.http.put<Items>(`${baseUrl}/food/`,food);
  }

  downloadImage(food:Items){
    this.downloadFile(food).subscribe({
      next : (response : Blob) => {
        console.log('Downloading.....');
        let reader = new FileReader();
        reader.addEventListener(
          'load', () => {
            food.foodImage = reader.result
          },
          false
        );
        if(response){
          reader.readAsDataURL(response);
        }
      },
    });
  }
}
