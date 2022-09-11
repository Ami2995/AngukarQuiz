import { CartItem } from './../../interface/CartItem';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart } from './../../interface/Cart';
import { Items } from './../../interface/Item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {

 cartItem:CartItem;
 cart:Cart = this.getCartFromLocalStorage();
 private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart); 
 totalPrice: Subject<number> = new BehaviorSubject<number>(0);
 totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  constructor(){}
  
  addToCart(food:Items){
    let alreadyExistInCart:boolean = false;
    let existingCartItem:CartItem = undefined;
    
    if(this.cart.items.length > 0){
      existingCartItem = this.cart.items
                         .find(items => items.id === food.id);

      alreadyExistInCart = (existingCartItem != undefined);
    }
    if(alreadyExistInCart){
      existingCartItem.quantity++;
      existingCartItem.price += existingCartItem.price;
    }else{
      this.cart.items.push(new CartItem(food));
    }

    this.calculateTotalPrice();
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.id != foodId);
    this.setCartToLocalStorage();
  }
  
  changeQuantity(foodId: number, quantity: number){
   let cartItem = this.cart.items
                  .find((item) => {
                    item.id == foodId
                  });
    if(!cartItem){
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = quantity*cartItem.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    
    const cartJson = JSON.stringify(this.cart);
    sessionStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
       const cartJson = sessionStorage.getItem('Cart');
       return cartJson? JSON.parse(cartJson): new Cart();
  }

  calculateTotalPrice(){
     let totalPriceValue:number = 0;
     let totalQuantityValue:number = 0;
     for(let currentCart of this.cart.items){
      totalPriceValue += currentCart.quantity*currentCart.price;
      totalQuantityValue += currentCart.quantity;
     }
    //  this.totalPrice.next(totalPriceValue);
    //  this.totalQuantity.next(totalQuantityValue);
  }
  }
