import { Component } from '@angular/core';
import { ApplyDoctorService } from '../../../Service/Apply-doctor/apply-doctor.service';
import { Router } from '@angular/router';

interface Doctor {
  userId: string,
  name: string;
  email: string;
  website: string;
  specialization: string;
  experience: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  doctors: Doctor[] = [];
  search_doctor: string = '';
  constructor(private getAllDoctor: ApplyDoctorService, private router: Router) { }

  ngOnInit(): void {
    // console.log("in search");
    this.getAllDoctor.getdata()
      .then(response => {
        // console.log(response.data.doctorList);

        this.doctors = response.data.doctorList.map((item: any) => ({
          userId: item.userId,
          name: `${item.userId.firstName} ${item.userId.lastName}`,
          email: item.userId.email,
          website: item.website,
          specialization: item.specialization,
          experience: item.experience,
        }));
        // console.log(this.doctors);
        // console.log("successful data added");
      })
      .catch(error => {
        console.log(error)
        console.log("error");
      })
  }

  searchDoctor() {
    this.doctors = this.doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(this.search_doctor.toLowerCase())
    );
  }

  find_appointment(data:any) {
    this.router.navigate(['/appointment', data]);
  }
}
