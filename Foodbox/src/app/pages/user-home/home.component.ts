import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Items } from 'src/app/interface/Item';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavbarServicesService } from 'src/app/services/navbar-service/navbar-services.service';
import { faHeart, faSearch, faThList } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ItemservicesService } from 'src/app/services/items-service/itemservices.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods = new BehaviorSubject<Items[]>([]);

  constructor(private items:ItemservicesService, private toast:ToastrService, private route:ActivatedRoute) { }

  public food:Items[] =  [];
  public foodData: Items = {
    id: 0,
    foodName: '',
    foodPrice: 0,
    foodDescription: '',
    foodImage: '',
    available: true,
    isFavorite: true,
    foodRating: 0,
    timeToCook: '',
    category: {
      id: 0,
      categoryName: ''
    }
  }
 
  heart:any = faHeart;
  image:any;
  filterText:any;
  favIcon:any = faHeart;
  fileName:string;
  
  ngOnInit(): void {
    this.getFoodItems();
  }
  search:any = faSearch;
images:string[] = ['../../../assets/images/ban5.jpg', '../../../assets/images/ban2.jpg', '../../../assets/images/ban3.jpg', '../../../assets/images/ban4.webp', '../../../assets/images/ban1.jpg']

  
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

}
