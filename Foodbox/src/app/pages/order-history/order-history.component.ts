import { Subject } from 'rxjs';
import { LoginservicesService } from './../../services/login-service/loginservices.service';
import { OrderHistory } from './../../interface/OrderHistory';
import { OrderHistoryServiceService } from './../../services/orderhistory-service/order-history-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private orderHistory:OrderHistoryServiceService,
              private loginService:LoginservicesService) { }
  orders:OrderHistory[] = [];
  user =this.loginService.getUserDetails();
  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory(){
    const theEmail = this.user.emailAddress;

    this.orderHistory.getOrdersHistory(theEmail).subscribe((data: OrderHistory[]) => {
      this.orders = data;
    },
    (error) =>{
      console.log(error);
    })
  }
  
}
