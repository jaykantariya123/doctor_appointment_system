import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './MyComponent/navbar/navbar.component';
import { LoginComponent } from './MyComponent/login/login.component';
import { RegisterComponent } from './MyComponent/register/register.component';
import { HomeComponent } from './MyComponent/home/home.component';
import { SearchComponent } from './MyComponent/home/search/search.component';
import { DoctorFormComponent } from './MyComponent/home/doctor-form/doctor-form.component';
import { DashboardComponent } from './MyComponent/home/dashboard/dashboard.component';
import { AppointmentComponent } from './MyComponent/home/appointment/appointment.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    DoctorFormComponent,
    DashboardComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
