import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { RecieptComponent } from './pages/reciept/reciept.component';
import { FoodComponentComponent } from './pages/food-component/food-component.component';
import { UpdateItemsComponent } from './pages/update-items/update-items.component';
import { AddItemsComponent } from './pages/add-items/add-items.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { ItemsComponent } from './pages/items/items.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { CategoryComponent } from './pages/category/category.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { UserGuard } from './services/user-guard/user.guard';
import { AdminGuard } from './services/admin-guard/admin.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/user-home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent, pathMatch:'full'},
  {path:'signup', component:RegisterComponent, pathMatch:'full'},
  {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[AdminGuard],
  children:[
    {
      path:'profile', component:ProfileComponent,
    },
    {
      path:'category', component:CategoryComponent,
    },
    {
      path:'add-category', component:AddCategoryComponent
    },
    {
      path:'food', component:ItemsComponent
    },
    {
      path:'update-category/:id', component:UpdateCategoryComponent
    },
    {
      path:'add-items', component:AddItemsComponent
    },
    {
      path:'update-items/:id', component:UpdateItemsComponent
    }
  ]
},
  {path:'home', component:HomeComponent, pathMatch:'full'},
  {path:'shop/:id', component:FoodComponentComponent},
  {path:'cart',component:CartComponent, canActivate:[UserGuard]},
  {path:'checkout',component:CheckoutComponent, canActivate:[UserGuard]},
  {path:'invoice', component:RecieptComponent},
  {path:'orders', component:OrderHistoryComponent, canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
