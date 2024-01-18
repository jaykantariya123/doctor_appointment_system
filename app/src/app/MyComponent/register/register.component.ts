import { Component } from '@angular/core';
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
  address: string = ''
  isDoctor:Boolean=false;

  constructor(private registerService: RegisterService) {

  }
  onClick() {

    const data = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address
    };
    console.log(data);

    this.registerService.postdata(data)
      .then(response => {
        console.log(response.data);

        console.log("successful data added");
      })
      .catch(error => {
        console.log(error)
        console.log("error");
      })
  }
}
