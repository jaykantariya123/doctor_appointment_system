import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


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
import { RoomComponent } from './MyComponent/home/room/room.component';
import { VideoCallComponent } from './MyComponent/home/video-call/video-call.component';
import { AppointmentsComponent } from './MyComponent/home/appointments/appointments.component';
import { AboutComponent } from './MyComponent/about/about.component';
import { SymptomCheckerComponent } from './MyComponent/home/symptom-checker/symptom-checker.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


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
    RoomComponent,
    VideoCallComponent,
    AppointmentsComponent,
    AboutComponent,
    SymptomCheckerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule, MatSelectModule, ReactiveFormsModule
  ],
  providers: [CookieService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
