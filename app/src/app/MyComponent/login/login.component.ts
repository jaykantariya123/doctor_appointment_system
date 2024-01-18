import { Component } from '@angular/core';
import { LoginService } from '../../Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService:LoginService) {

  }


  onClick() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.loginService.postdata(data)
    .then(response=>{
      console.log(response.data);

      console.log("successful login");
    })
    .catch(error=>{
      console.log(error)
      console.log("error in login");
    })
  }

}
