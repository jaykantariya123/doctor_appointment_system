import { Component } from '@angular/core';
import { GetAppointmentsService } from '../../../Service/appointments/get-appointments.service';
import { DataTransferService } from '../../../Service/Data-transfer/data-transfer.service';

interface Appointment {
  id: string,
  doctorName: string,
  email: string,
  date: string,
  time: string,
  status: string
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})


export class AppointmentsComponent {
  appointments: Appointment[] = [];

  // Id: string = '';
  constructor(private getAppointment: GetAppointmentsService, private getIdservice: DataTransferService) { }
  ngOnInit(): void {

    const data = {
      user: JSON.parse(JSON.parse(this.getIdservice.getUserId()))
    };
    console.log(data);
    // console.log(this.id);
    this.getAppointment.getAppointments(data)
      .then(response => {
        // console.log(response.data.Appointment);

        this.appointments = response.data.Appointment.map((item: any) => ({
          id: item._id,
          doctorName: `${item.doctor.userId.firstName} ${item.doctor.userId.lastName}`,
          email: item.doctor.userId.email,
          date: item.date,
          time: item.time,
          status: item.status
        }));
        // console.log(this.appointments);
      })
      .catch(error => {
        console.log(error)
        console.log("error");
      })
  }

  isAppointmentDone(appointmentDate: string): boolean {
    const currentDate = new Date();
    const appointment = new Date(appointmentDate);
    // Assuming that if the appointment date is in the past, it's considered done
    return appointment < currentDate;
  }
  // oncall(){

  // }

}
