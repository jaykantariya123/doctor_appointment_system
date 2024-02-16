import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponent/login/login.component';
import { RegisterComponent } from './MyComponent/register/register.component';
import { HomeComponent } from './MyComponent/home/home.component';
import { SearchComponent } from './MyComponent/home/search/search.component';
import { DoctorFormComponent } from './MyComponent/home/doctor-form/doctor-form.component';
import { DashboardComponent } from './MyComponent/home/dashboard/dashboard.component';
import { AppointmentComponent } from './MyComponent/home/appointment/appointment.component';
import { RoomComponent } from './MyComponent/home/room/room.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'home', component: HomeComponent, children: [
      // { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'doctorform', component: DoctorFormComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'room/:roomId', component: RoomComponent }
    ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
