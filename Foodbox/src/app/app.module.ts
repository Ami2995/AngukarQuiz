import { HomeComponent } from './pages/user-home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProvider } from './services/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepages/navbar/navbar.component';
import { FooterComponent } from './sharepages/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { BnNgIdleService } from 'bn-ng-idle';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { ItemsComponent } from './pages/items/items.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddItemsComponent } from './pages/add-items/add-items.component';
import { UpdateItemsComponent } from './pages/update-items/update-items.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FoodComponentComponent } from './pages/food-component/food-component.component';
import { CartComponent } from './pages/cart/cart.component';
import { TitleComponent } from './pages/title/title.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RecieptComponent } from './pages/reciept/reciept.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashboardComponent,
    SidebarComponent,
    ProfileComponent,
    CategoryComponent,
    ItemsComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddItemsComponent,
    UpdateItemsComponent,
    HomeComponent,
    FoodComponentComponent,
    CartComponent,
    TitleComponent,
    NotFoundComponent,
    CheckoutComponent,
    RecieptComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    authInterceptorProvider,
    BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
