import { CategoryServiceService } from '../../services/category-service/category-service.service';
import { Category } from '../../interface/Category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { faFileCirclePlus, faPen, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public category:Category[];

  constructor(private categories:CategoryServiceService, private toast:ToastrService, private router:Router) { }
   
  ngOnInit(): void {
    this.getCategory();
  }

  closeResult:string = '';

  update:any = faPen;
  delete:any = faTrashArrowUp;
  add:any = faFileCirclePlus;

  public getCategory(): void{
    this.categories.getCategory().subscribe(
      (response:Category[]) => {
        this.category = response;
      },
      (error:HttpErrorResponse) => {
        this.toast.error("Something went wrong !!", "Error",{
          timeOut:3000
        })
      });
  }

  deleteCategory(id:number){
    this.categories.deleteCategory(id).subscribe((data) => {
      console.log(data);
      this.getCategory();
      this.toast.success("Deleted Successfully !!", "Success", {
        timeOut:3000
      });
    },
    (error) => {
      console.log(error);
      this.toast.error("Something went wrong !!", "Error", {
        timeOut:3000
      });
    });
  }

  updateCategory(id:number){
    this.router.navigate(['admin-dashboard/update-category',id])
  }
  
}
