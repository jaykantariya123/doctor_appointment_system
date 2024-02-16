import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Service/Auth/auth.service';
import { DataTransferService } from '../../Service/Data-transfer/data-transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isDoctor: boolean = false;
  userId: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    const userType = this.authService.getUserTypeFromToken();
    console.log(userType);
    this.isDoctor = userType === 'doctor';
    this.userId = JSON.stringify(localStorage.getItem('id'));
    this.dataTransferService.setUserId(this.userId);
    // this.route.params.subscribe(params => {
    //   this.userId = params['id'];
    //   // console.log('User ID:', this.id);

    // });

  }

}
