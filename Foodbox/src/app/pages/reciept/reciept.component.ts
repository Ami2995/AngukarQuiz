import { Cart } from './../../interface/Cart';
import { CartServicesService } from './../../services/cart-service/cart-services.service';
import { OrderHistory } from './../../interface/OrderHistory';
import { OrderHistoryServiceService } from './../../services/orderhistory-service/order-history-service.service';
import { Component, OnInit } from '@angular/core';
import { LoginservicesService } from 'src/app/services/login-service/loginservices.service';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {

  currentDate = new Date();
  constructor(private loginService:LoginservicesService, 
              private cartService:CartServicesService, 
              private orderHistory:OrderHistoryServiceService) { }
  orders:OrderHistory;
  cart!:Cart;
  ngOnInit(): void {
  this.cartService.getCartObservable().subscribe((data) =>{
    this.cart = data;
  })
  }
  

  user = this.loginService.getUserDetails();
}
