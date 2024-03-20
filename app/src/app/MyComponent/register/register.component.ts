import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../Service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  isDoctor: Boolean = false;

  registrationSuccess: boolean = false;

  constructor(private registerService: RegisterService, private router: Router) {

  }
  onClick() {

    const data = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      isDoctor:this.isDoctor
    };
    console.log(data);

    this.registerService.postdata(data)
      .then(response => {
        console.log(response.data);

        console.log("successful data added");

        this.registrationSuccess = true;
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error)
        console.log("error");
      })
  }
}
