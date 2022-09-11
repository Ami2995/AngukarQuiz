import { Component, OnInit } from '@angular/core';
import { faList, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { faGear, faHouse,  faUser, faPlateWheat} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  home:any = faHouse;
  profile:any = faUser;
  setting:any = faGear;
  imageSrc:string = 'assets/images/admin.jpg';
  imageName:string = 'admiLogo';
  category:any  = faPlateWheat;
  product:any = faPizzaSlice;

}
