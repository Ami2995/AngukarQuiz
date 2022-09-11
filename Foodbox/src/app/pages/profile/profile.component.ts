import { LoginservicesService } from './../../services/login-service/loginservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   user = this.login.getUserDetails();
  constructor(private login:LoginservicesService) { }

  ngOnInit(): void { 
  }

}
