import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../../../Service/Data-transfer/data-transfer.service';
import { ApplyDoctorService } from '../../../Service/Apply-doctor/apply-doctor.service';


@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent {
  morningTimeOptions = ['9:00', '10:00', '11:00', '12:00', '1:00'];
  eveningTimeOptions = ['4:00', '5:00', '6:00', '7:00', '8:00'];
  userId: string = '';
  website: string = '';
  specialization: string = '';
  experience: string = '';
  feesPerCunsaltation: string = '';
  timeSlot = {
    morningStart: '',
    morningEnd: '',
    eveningStart: '',
    eveningEnd: ''
  };

  constructor(private route: ActivatedRoute, private dataTransferService: DataTransferService, private applyDoctorService: ApplyDoctorService, private router: Router) { }



  onClick() {
    this.userId = this.dataTransferService.getUserId();
    const data = {
      userId: this.userId,
      website: this.website,
      specialization: this.specialization,
      experience: this.experience,
      feesPerCunsaltation: this.feesPerCunsaltation,
      timeSlot: this.timeSlot,
    };
    

    this.applyDoctorService.getdoctor(this.userId)
      .then(response => {
        if (response.data.exists) {
          this.applyDoctorService.updateDoctorInfo(data)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error)
              console.log("error");
            })
        }
        else {
          this.applyDoctorService.postdata(data)
            .then(response => {
              console.log(response.data);
              this.router.navigate(['/dashboard']);
            })
            .catch(error => {
              console.log(error)
              console.log("error");
            })
        }
      })
      .catch(error => {
        console.log("not found user");
      })

  }

}
