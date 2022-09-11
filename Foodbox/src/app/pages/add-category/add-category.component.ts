import { CategoryServiceService } from '../../services/category-service/category-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/Category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category:Category = {        
    id:NaN,
    categoryName:''
  }
  constructor(private categoryService:CategoryServiceService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.category.categoryName.trim() == '' || this.category.categoryName == null){
      this.toastr.warning("Fields can not be empty !!", 'Error', {
        timeOut:3000
      });
      return
    }

    this.categoryService.addCategory(this.category).subscribe((data:Category) =>
    {
      console.log(data);
      this.router.navigate(['admin-dashboard/category']);
      this.toastr.success("Insertion successfull", 'Success',{timeOut:3000});
    },
    (error) => {
      console.log(error);
      this.toastr.error("Something went wrong !!", 'Error',{
        timeOut:3000
      });
      });
  }

}
