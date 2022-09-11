import { CartServicesService } from './../../services/cart-service/cart-services.service';
import { User } from './../../interface/User';
import { login } from './../../interface/Login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginservicesService } from './../../services/login-service/loginservices.service';
import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faEnvelope, faLessThanEqual, faPhone, faSearch} from '@fortawesome/free-solid-svg-icons';
import {  faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {  faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import {  faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavbarServicesService } from 'src/app/services/navbar-service/navbar-services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartQuantity = 0;
  constructor(private cartService:CartServicesService, 
               public login:LoginservicesService, private router:Router, public nav:NavbarServicesService) { 
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }
  user: User;
  ngOnInit(): void {
   this.user = this.login.getUserDetails();
   this.login.loginStatusSubject.asObservable().subscribe((data)=>{
   this.user = this.login.getUserDetails();
   });
  }
  
  imageSrc:string = './assets/images/FOODBOX.png';
  imageName:string = 'logo';
  emailIcon:any = faEnvelope;
  phoneIcon:any = faPhone;
  fbIcon:any = faFacebook;
  twitIcon:any = faTwitter;
  instaIcon:any = faInstagram;
  signUpIcon:any = faUserPlus;
  loginIcon:any = faArrowRightToBracket;
  logoutIcon:any = faArrowRightFromBracket;
  cartIcon:any = faCartShopping;
  isHome:boolean = true;
  logout(){
    this.router.navigate(['login']);
    this.cartService.clearCart();
    this.login.logOut();
  }
  
}
