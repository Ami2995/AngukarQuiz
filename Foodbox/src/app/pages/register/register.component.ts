import { Router } from '@angular/router';
import { NavbarServicesService } from './../../services/navbar-service/navbar-services.service';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from '../../services/user-service/userservice.service';
import { User } from './../../interface/User';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  submitted:boolean = false;

  public user:User = {
    id:0,
    firstName:'',
    lastName:'',
    emailAddress:'',
    mobileNumber:'',
    password:'',
    cpassword:''
  }

  constructor(private formBuilder:FormBuilder, private router:Router, private userService:UserserviceService, private toastr:ToastrService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:['', [Validators.required]],
      lastName:['',[Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber:['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9 +]*')]],
      password:['', [Validators.required, Validators.minLength(8)]],
      cpassword:['', [Validators.required, Validators.minLength(8)]],
    })
  } 

image:string = './assets/images/back.webp';
imageSrc:string = './assets/images/FOODBOX.png';
imageName:string = 'logo';

submitForm(){
  this.submitted = true;
  
  if(this.user.password!=this.user.cpassword){
    this.toastr.warning('Password does not match', 'Error', {
      timeOut:3500
    })
    return;
  }else if(this.registerForm.invalid){
    return;
  }

  this.userService.addUser(this.user).subscribe(
    (data:User) =>{
      console.log(data);
      this.toastr.success('Login to continue !!', 'You registered successfully',{
        timeOut:3500
      }); 
      this.router.navigate(['login']);
    },
    (error) =>{
      console.log(error);
     if(error){
      this.toastr.error('Something went wrong', 'Error', {
        timeOut:3500
      });
     }
  });
}

}
