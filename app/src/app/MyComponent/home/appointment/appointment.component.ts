import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timestamp } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { BookAppointmentServiceService } from '../../../Service/book-appointment/book-appointment-service.service';
import { DataTransferService } from '../../../Service/Data-transfer/data-transfer.service';
import { LoginService } from '../../../Service/login.service';

declare var Razorpay: any;
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
  amount: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private route: ActivatedRoute, private bookappointment: BookAppointmentServiceService, private dataTransfer: DataTransferService, private getdata: LoginService) {

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
      console.log(this.doctor_data);
      this.doctor_id = this.doctor_data.doctorId;
      this.amount = this.doctor_data.amount;

      this.user_id = JSON.parse(JSON.parse(this.dataTransfer.getUserId()));
      this.getdata.getdata(this.user_id)
        .then(response => {
          console.log(response.data);
          this.name = response.data.firstName + " " + response.data.lastName;
          this.email = response.data.email;
          // this.address = response.data.address;
          this.phone = response.data.phone;
          // console.log("successful fetch data");
        })
        .catch(error => {
          console.log(error)
          console.log("error in fetching in data");
        })
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

  async bookAppointmnet() {
    const data = {
      date: this.date,
      time: this.time,
      doctor: this.doctor_id,
      user: this.user_id
    }
    console.log(data);

    this.bookappointment.verifydata(data)
      .then(async response => {
        console.log(response.data);
        if (!response.data.success) {
          this.showMessage = "this slot already booked ,Sorry !!!!";
        }
        else {
          await this.paynow();
          if (this.showMessage == "payment not done successfully") {
            data.date = "-";
            data.time = "-";
            console.log(data);
            console.log("on payment fail");
            this.bookappointment.postdata(data).then(
              response => { this.showMessage = response.data.message; }
            )
          }
          else{
            this.bookappointment.postdata(data).then(
              response => { this.showMessage = response.data.message; }
            )
          }
        }

        // console.log("successful book appointment");

      })
      .catch(error => {
        console.log(error)
        console.log("error in book appointment");
      })
  }

  paynow() {
    const RazorpayOptions = {
      key: "rzp_test_dRlCT5WmwmpnBu",
      amount: Number(this.amount) * 100,
      currency: "INR",
      name: 'Demo',
      description: 'Test Payment',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',

      prefill: {
        name: this.name,
        email: this.email,
        contact: this.phone
      },
      modal: {
        ondismiss: () => {
          this.showMessage = "payment not done successfully"
          console.log('dismissed');
        }
      },
      theme: {
        color: '#6326f0'
      }
    };

    const successCallback = (paymentId: any) => {
      console.log(paymentId);

    }

    const failureCallback = (e: any) => {
      this.showMessage = "payment not done successfully";
      console.log(e);
    }
    Razorpay.open(RazorpayOptions, successCallback, failureCallback);
  }
}
