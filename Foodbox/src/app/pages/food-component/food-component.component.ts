import { ToastrService } from 'ngx-toastr';
import { CartServicesService } from './../../services/cart-service/cart-services.service';
import { BehaviorSubject } from 'rxjs';
import { ItemservicesService } from './../../services/items-service/itemservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Items } from './../../interface/Item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-component',
  templateUrl: './food-component.component.html',
  styleUrls: ['./food-component.component.css']
})
export class FoodComponentComponent implements OnInit {
  public foodData: Items = {
    id: 0,
    foodName: '',
    foodPrice: 0,
    foodDescription: '',
    foodImage: '',
    available: true,
    isFavorite: false,
    foodRating: 5,
    timeToCook: '',
    category: {
      id: 0,
      categoryName: ''
    }
  }

  id: any
  constructor(private router: Router, private toast:ToastrService, private route: ActivatedRoute, private cartservice: CartServicesService, private foodService: ItemservicesService) {
    this.id = route.snapshot.params['id']
    foodService.getItemsById(this.id).subscribe((data) => {
      this.foodData = data;
      this.foodService.downloadImage(this.foodData);
    });
  }


  ngOnInit(): void {

  }

  addToCart() {
    this.cartservice.addToCart(this.foodData);
    this.toast.success('Added to cart', "Success",{
      timeOut:4000
    });
  }
}