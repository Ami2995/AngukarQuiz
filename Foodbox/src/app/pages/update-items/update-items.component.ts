import { CategoryServiceService } from './../../services/category-service/category-service.service';
import { Category } from './../../interface/Category';
import { Items } from './../../interface/Item';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemservicesService } from './../../services/items-service/itemservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {

  constructor(private itemService:ItemservicesService, private categoryService:CategoryServiceService, private route:ActivatedRoute, private router:Router, private toastr:ToastrService) { }

  id:any;
  public foodData :Items = {
    id:0,
    foodName:'',
    foodPrice:0,
    foodDescription:'',
    foodImage:'',
    available:true,
    isFavorite:true,
    foodRating:0,
    timeToCook:'',
    category:{
      id:0,
      categoryName:''
    }
  }

  public image:File;
  public categories:Category[]; 
  url:any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.itemService.getItemsById(this.id).subscribe((data:Items) => {
      this.foodData = data;
    },
    (error) => {
      console.log(error);
    });

    this.getCategory();
  }

  getCategory(){
    this.categoryService.getCategory().subscribe((response:Category[]) =>{
      this.categories = response;
    })
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

  updateData(){
    if(this.foodData.foodImage==undefined){
      this.toastr.warning("Select image !!", "Error", {
        timeOut:3000
      });
      return
    }
    this.itemService.updateItem(this.foodData).subscribe((data) => {
      this.router.navigate(['admin-dashboard/food']);
      this.toastr.success("Updated successfully !!", "Success", {
        timeOut:3000
      });
    },
    (error) => {
      this.toastr.error("Something went wrong !!", "Error", {
        timeOut:3000
      });
    })
  }
}
