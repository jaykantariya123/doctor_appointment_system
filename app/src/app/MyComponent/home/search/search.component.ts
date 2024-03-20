import { Component } from '@angular/core';
import { ApplyDoctorService } from '../../../Service/Apply-doctor/apply-doctor.service';
import { Router } from '@angular/router';

interface Doctor {
  userId: string,
  name: string;
  email: string;
  website: string;
  specialization: string;
  amount:string;
  experience: string;
  timeslots: {
    morningStart: String,
    morningEnd: String,
    eveningStart: String,
    eveningEnd: String
  };
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
          doctorId: item._id,
          userId: item.userId,
          name: `${item.userId.firstName} ${item.userId.lastName}`,
          email: item.userId.email,
          website: item.website,
          specialization: item.specialization,
          experience: item.experience,
          timeslotes: item.timeSlot,
          amount: item.feesPerCunsaltation,
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

  book_appointment(doctor: any) {
    // console.log(doctor);
    localStorage.setItem('doctordata', JSON.stringify(doctor));
  }
}
