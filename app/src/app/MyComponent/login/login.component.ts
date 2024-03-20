import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login.service';
import { AuthService } from '../../Service/Auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginfail: boolean = true;

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {

  }


  onClick() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.loginService.postdata(data)
      .then(response => {
        this.authService.setToken(response.data.token);
        // console.log(response.data.token);

        console.log("successful login");
        localStorage.setItem('id', JSON.stringify(this.authService.getIdFromToken()));
        this.router.navigate(['/home']);

      })
      .catch(error => {
        console.log(error)
        this.loginfail = false;
        console.log("error in login");
      })
  }

}
