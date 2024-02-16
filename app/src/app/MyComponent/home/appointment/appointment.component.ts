import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timestamp } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { BookAppointmentServiceService } from '../../../Service/book-appointment/book-appointment-service.service';
import { DataTransferService } from '../../../Service/Data-transfer/data-transfer.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  morningTimeRanges: string[] = [];
  eveningTimeRanges: string[] = [];
  timeRange: 'morning' | 'evening' = 'morning';
  showMessage: string = '';
  doctor_data: any;

  date: string = '';
  time: string = '';
  doctor_id: string = '';
  user_id: string = '';

  constructor(private route: ActivatedRoute, private bookappointment: BookAppointmentServiceService, private dataTransfer: DataTransferService) {

  }
  onTimeRangeChange(range: 'morning' | 'evening'): void {
    this.timeRange = range;
  }

  generateTimeRanges(start: string, end: string, interval: number, type: boolean): string[] {
    const startTime = new Date(`2022-01-01 ${start}`);
    const endTime = new Date(`2022-01-01 ${end}`);
    const timeRanges: string[] = [];

    while (startTime < endTime) {
      const rangeStart = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: type });
      startTime.setMinutes(startTime.getMinutes() + interval);
      const rangeEnd = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: type });

      timeRanges.push(`${rangeStart}-${rangeEnd}`);
    }
    return timeRanges;
  }



  ngOnInit(): void {
    const data = localStorage.getItem('doctordata');
    // console.log(data);
    if (data) {
      this.doctor_data = JSON.parse(data);
      // console.log(this.doctor_data.doctorId);
      this.doctor_id = this.doctor_data.doctorId;
      this.user_id = JSON.parse(JSON.parse(this.dataTransfer.getUserId()));
      // console.log(this.doctor_data.);
      // console.log(this.user_id, this.doctor_id);

    }

    this.morningTimeRanges = this.generateTimeRanges(
      this.doctor_data.timeslotes.morningStart,
      this.doctor_data.timeslotes.morningEnd,
      60,
      false
    );

    // console.log(this.morningTimeRanges);
    this.eveningTimeRanges = this.generateTimeRanges(
      this.doctor_data.timeslotes.eveningStart,
      this.doctor_data.timeslotes.eveningEnd,
      60,
      false
    );
  }

  bookAppointmnet(): void {
    const data = {
      date: this.date,
      time: this.time,
      doctor: this.doctor_id,
      user: this.user_id
    }
    console.log(data);

    this.bookappointment.postdata(data)
      .then(response => {
        console.log(response.data);
        this.showMessage = response.data.message;
        // console.log("successful book appointment");

      })
      .catch(error => {
        console.log(error)
        console.log("error in book appointment");
      })
  }
}
