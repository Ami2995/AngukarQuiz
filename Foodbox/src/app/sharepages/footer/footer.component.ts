import { faFacebook, faGoogle, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  facebook:any = faFacebook;
  google:any = faGoogle;
  twitter:any = faTwitter;
  insta:any = faInstagram;
  git:any = faGithub;
  constructor() { }

  ngOnInit(): void {
  }

}
