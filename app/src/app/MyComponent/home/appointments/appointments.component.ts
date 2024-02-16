import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})

// interface Appointment {
//   dc: string,
//   name: string;
//   email: string;
//   website: string;
//   specialization: string;
//   experience: string;
//   timeslots: {
//     morningStart: String,
//     morningEnd: String,
//     eveningStart: String,
//     eveningEnd: String
//   };
// }

export class AppointmentsComponent {
  // appointments: [] = [];

  ngOnInit(): void {
    
  }
}
