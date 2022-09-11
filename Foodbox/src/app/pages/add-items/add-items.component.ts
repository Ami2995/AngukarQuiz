import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CategoryServiceService } from '../../services/category-service/category-service.service';
import { ItemservicesService } from '../../services/items-service/itemservices.service';
import { Category } from '../../interface/Category';

import { Items } from 'src/app/interface/Item';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {

  public foodData:Items = {
    id:0,
    foodName:'',
    foodPrice:0,
    foodDescription:'',
    foodImage:'',
    available:true,
    isFavorite:true,
    foodRating:NaN,
    timeToCook:'',
    category:{
      id:0,
      categoryName:''
    }
  }

  public image:File;
  public categories:Category[];  

  constructor(private toast:ToastrService, private router:Router, private foodService:ItemservicesService, private categoryService:CategoryServiceService) {
  
   }

  ngOnInit(): void {
    this.getCategory();
   }
   
   url:any;

  getCategory(){
    this.categoryService.getCategory().subscribe((response:Category[]) =>{
      this.categories = response;
    })
  }


  addFoodItems(foodForm:NgForm){

    if(this.foodData.foodName.trim() == '' || this.foodData.foodName == null){
      this.toast.warning("Please provide name.", "Error", {
        timeOut:3000
      });
      return
    }
    
    if(this.foodData.foodPrice == null){
      this.toast.warning("Please enter price.", "Error", {
        timeOut:3000
      });
      return
    }

    if(this.foodData.foodImage == undefined){
      this.toast.warning("Select image first.", "Error", {
        timeOut:3000
      });
      return
    }


      const foodFormData = this.prepareFormDate(this.foodData);
      this.foodService.addFoodItems(foodFormData).subscribe((response) => {
        this.router.navigate(['admin-dashboard/food']);
        this.toast.success("Item added successfully !!", "Success",{
          timeOut:3000
        });
      },
      (error) =>{
        console.log(error);
        this.toast.error("Something went wrong !!", "Error",{
          timeOut:3000
        });
      })
  }

  prepareFormDate(foodData:Items): FormData {
    const formData = new FormData();

    formData.append(
      'foodData',
      new Blob([JSON.stringify(foodData)], {type: 'application/json'})
    );

    formData.append(
      'imageFile', this.image
    );

    return formData;
  }

  onSelectFile(event){
    if(event.target.files){
      const file = event.target.files[0];
      this.image = file;
      console.log(this.image);

      var reader = new FileReader();
      reader.onload = (event:any) => {
      this.url = event.target.result;
      }
      reader.readAsDataURL(this.image)
    }
  }

}
