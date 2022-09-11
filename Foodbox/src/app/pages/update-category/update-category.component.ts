import { ToastrService } from 'ngx-toastr';
import { CategoryServiceService } from './../../services/category-service/category-service.service';
import { Category } from 'src/app/interface/Category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  id:number;
  public category:Category = {        
    id:NaN,
    categoryName:''
  }

  constructor(private categoryService:CategoryServiceService, private toastr:ToastrService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(this.id).subscribe((data) => 
    {
      this.category = data;
    },
    (error) => {
      console.log(error);
    });
  }

  onSubmit(){
    if(this.category.categoryName.trim() == '' || this.category.categoryName == null){
      this.toastr.warning("Fields can not be empty !!", 'Error', {
        timeOut:3000
      });
      return
    }

    this.categoryService.updateEmployee(this.id, this.category).subscribe((data) =>
    {
      console.log(data);
      this.router.navigate(['admin-dashboard/category']);
      this.toastr.success("Updated successfully", 'Success',{timeOut:3000});
    },
    (error) => {
      console.log(error);
      this.toastr.error("Something went wrong !!", 'Error',{
        timeOut:3000
      });
      });    
  }
}
