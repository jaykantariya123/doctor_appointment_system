import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApplyDoctorService {

  constructor() { }
  postdata(data: any): Promise<any> {
    // console.log(data);
    return axios.post('http://localhost:8080/api/doctor/apply-doctor', data);
  }

  getdata(): Promise<any> {
    // console.log(data);
    return axios.get('http://localhost:8080/api/doctor/getAllDoctor');
  }

  getdoctor(userId:String): Promise<any> {
    // console.log(data);
    return axios.get(`http://localhost:8080/api/doctor/existDoctor/${userId}`);
  }

  updateDoctorInfo(data:any): Promise<any> {
    // console.log(data);
    return axios.put('http://localhost:8080/api/doctor/updatedoctorInfo',data);
  }
}
