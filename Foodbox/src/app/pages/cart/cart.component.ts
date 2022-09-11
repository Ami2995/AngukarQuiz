import { Items } from './../../interface/Item';
import { CartItem } from './../../interface/CartItem';
import { CartServicesService } from './../../services/cart-service/cart-services.service';
import { Cart } from './../../interface/Cart';
import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faMinus, faPlus, faRemove, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

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

  cart!:Cart;
  delete:any = faTrashCan;
  deliveryCharge:number = 20;
  govtTax:number = 14;
  totalCharge:number;
  plus:any = faPlus;
  minus:any = faMinus;
  constructor(private cartService:CartServicesService) {
    cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      this.totalCharge = this.cart.totalPrice + this.deliveryCharge + this.govtTax;
    })
   }

  ngOnInit(): void {
  }

  removeItem(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem.id);
  }

}
