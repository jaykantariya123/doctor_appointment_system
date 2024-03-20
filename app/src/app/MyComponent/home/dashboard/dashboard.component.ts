import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../../../Service/Data-transfer/data-transfer.service';
import { LoginService } from '../../../Service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userId: string = '';
  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  constructor(private router: Router, private dataservice: DataTransferService, private getdata: LoginService) { }

  ngOnInit(): void {
    this.userId = this.dataservice.getUserId();
    this.getdata.getdata(JSON.parse(JSON.parse(this.userId)))
      .then(response => {
        console.log(response.data);
        this.name=response.data.firstName+" "+response.data.lastName;
        this.email=response.data.email;
        this.address=response.data.address;
        this.phone=response.data.phone;
        // console.log("successful fetch data");
      })
      .catch(error => {
        console.log(error)
        console.log("error in fetching in data");
      })
  }
} 
