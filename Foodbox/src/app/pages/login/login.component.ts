import { NavbarServicesService } from './../../services/navbar-service/navbar-services.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { LoginservicesService } from './../../services/login-service/loginservices.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../../interface/Login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  imageSrc: string = './assets/images/FOODBOX.png';
  imageName: string = 'logo';
  image: string = './assets/images/login.jpg'
  constructor(private formBuilder: FormBuilder, 
    private router:Router, 
    private login:LoginservicesService,
     private toastr:ToastrService,
     private bnNgIdle:BnNgIdleService,
     private nav:NavbarServicesService) { }

  ngOnInit(): void {
    this.nav.hide();
    this.registerForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public logindata:login = {
    username:'',
    password:'' 
  }

  submitForm() {
    this.submitted = true;

    this.login.generateToken(this.logindata).subscribe(
      (data:any) => {
        this.toastr.success('Logged in successfully', 'Success',{
          timeOut:3500
        })
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any) => {
           this.login.saveUserDetails(user);

           if(this.login.getUserRole() == 'ROLE_ADMIN'){
              this.router.navigate(['admin-dashboard']);
              this.login.loginStatusSubject.next(true);
           }else if(this.login.getUserRole() == 'ROLE_USER'){
            this.router.navigate(['home']);
            this.login.loginStatusSubject.next(true);
           }else{
            this.login.logOut();
           }
        });
      },
      (error:any) => {
        console.log(error);
        if(this.logindata.username=="" || this.logindata.password=="" || this.logindata.username==null || this.logindata.password==null){
          this.toastr.warning("Fields can not be empty !!", 'Error',{
            timeOut:3500
          })
        }else if(error){
          this.toastr.error("Invalid Creadentials !!", 'Error',{
            timeOut:3500
          })
        }
        }
      
    )
  }

}
