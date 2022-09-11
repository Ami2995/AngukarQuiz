import { NavbarServicesService } from 'src/app/services/navbar-service/navbar-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private nav:NavbarServicesService) { }

  ngOnInit(): void {
    this.nav.show();
  }

}
