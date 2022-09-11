import { Router } from '@angular/router';
import { Purchase } from 'src/app/interface/Purchase';
import { OrderItem } from './../../interface/OrderItem';
import { Order } from './../../interface/Order';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CheckoutServicesService } from './../../services/checkout-servie/checkout-services.service';
import { CartServicesService } from './../../services/cart-service/cart-services.service';
import { Cart } from './../../interface/Cart';
import { LoginservicesService } from './../../services/login-service/loginservices.service';
import { Component, OnInit } from '@angular/core';
import {CustomValidator} from './../../interface/CustomValidator';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalCharge:number;
  promoCode:number = 20;
  cartQuantity:number;

  checkoutFormGroup:FormGroup;
  deliveryCharge:number = 20;
  govtTax:number = 14;
  totalPrice:number = 0;
  totalQuantity:number = 0;

  creditCardYears:number[] = [2022,2023,2024,2025,2026,2027,2028,2029,2030];
  creditCardMonths:string[] = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December' ];


  constructor(private formBuilder:FormBuilder,
              private loginService:LoginservicesService,
              private cartService:CartServicesService,
              private checkoutService:CheckoutServicesService,
              private router: Router) {

    this.checkoutFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        'firstName': new FormControl('', [Validators.required, Validators.minLength(3),
                                           CustomValidator.noWhiteSpace]),
        'lastName': new FormControl('', [Validators.required, Validators.minLength(3),
                                         CustomValidator.noWhiteSpace]),
        'emailAddress': new FormControl('', [Validators.required, 
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        'address': new FormControl('', [Validators.required, Validators.minLength(10),
          CustomValidator.noWhiteSpace]),
        'city': new FormControl('', [Validators.required, Validators.minLength(4),
          CustomValidator.noWhiteSpace]),
        'state': new FormControl('', [Validators.required]),
        'postalCode': new FormControl('', [Validators.required,
          CustomValidator.noWhiteSpace, Validators.pattern('[0-9]{6}')])
      }),
      creditCard: this.formBuilder.group({
        'cardType': new FormControl('', [Validators.required]),
        'nameOnCard': new FormControl('', [Validators.required, Validators.minLength(4),
          CustomValidator.noWhiteSpace]),
        'cardNumber': new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        'securityCode': new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        'expirationMonth' : [''],
        'expirationYear' : ['']
      })    
    });
   }
  cart!:Cart;
  user = this.loginService.getUserDetails();
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      this.totalCharge = this.cart.totalPrice + this.deliveryCharge + this.govtTax - this.promoCode;
      this.cartQuantity = cart.totalCount;
    });
  }

  get firstName(){return this.checkoutFormGroup.get('user.firstName');}
  get lastName(){return this.checkoutFormGroup.get('user.lastName');}
  get emailAddress(){return this.checkoutFormGroup.get('user.emailAddress');}
  get address(){return this.checkoutFormGroup.get('shippingAddress.address');}
  get city(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get state(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get postalCode(){return this.checkoutFormGroup.get('shippingAddress.postalCode');}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}

  onSubmit(){
    if(this.checkoutFormGroup.invalid){
     this.checkoutFormGroup.markAllAsTouched();
     return;
    }  
    let order = new Order();
    order.totalPrice = this.totalCharge;
    order.totalQuantity = this.cartQuantity;

    const cartItems = this.cartService.cart.items;
    console.log(cartItems);

    let orderItem:OrderItem[] = cartItems.map(tempCartItems => new OrderItem(tempCartItems));
    console.log(orderItem);

    let purchase = new Purchase();
    purchase.address = this.checkoutFormGroup.controls['shippingAddress'].value; 
    purchase.user = this.checkoutFormGroup.controls['user'].value; 
    purchase.order = order;
    console.log(purchase.order)
    purchase.orderItems = orderItem;

    this.checkoutService.createOrder(purchase).subscribe({
      next: response => {
        alert(`your order tracking number: ${response.orderTrackingNumber}`);
        this.cartService.clearCart();
        this.checkoutFormGroup.reset();
        this.promoCode =0;
        this.totalCharge =0;
        this.router.navigate(['invoice']);
      },
      error: err => {
        alert(`there was an error`);
      }
    })

    }

}
