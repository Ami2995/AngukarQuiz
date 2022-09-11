import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarServicesService {

  visible: boolean;
  constructor() { }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  doSomethingElseUseful() { }

}
