import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Items } from './../../interface/Item';
import { ItemservicesService } from './../../services/items-service/itemservices.service';
import { faPen, faTrashArrowUp, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  foods = new BehaviorSubject<Items[]>([]);

  constructor(private items:ItemservicesService, private toast:ToastrService, private sanitizer:DomSanitizer) { }

  public food:Items[];

  image:any;
  ngOnInit(): void {
    this.getFoodItems();
  }

  update:any = faPen;
  delete:any = faTrashArrowUp;
  add:any = faFileCirclePlus;
 
  public getFoodItems() : void{
    this.items.getFoodItems().subscribe(
      (response:Items[]) => {
        this.food = response;
        this.food.forEach((item) =>{
          this.items.downloadFile(item).subscribe({
            next : (response : Blob) => {
              console.log('Downloading.....');
              let reader = new FileReader();
              reader.addEventListener(
                'load', () => {
                  item.foodImage = reader.result
                },
                false
              );
              if(response){
                reader.readAsDataURL(response);
              }
            },
          });
        });
        this.foods.next(this.food);
      }, 
      (error:HttpErrorResponse) => {
        this.toast.error("Something went wrong !!", "Error",{
          timeOut:3000
        })
      });
    }

    deleteItem(id:number){
    this.items.deleteItem(id).subscribe((data) => {
      console.log(data);
      this.getFoodItems();
      this.toast.success("Deleted Successfully !!", "Success", {
        timeOut:3000
      });
    },
    (error) => {
      console.log(error);
      this.toast.error("Something went wrong !!", "Error", {
        timeOut:3000
      });
    });
    }

}
