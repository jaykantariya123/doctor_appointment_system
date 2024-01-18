import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  postdata(data: any): Promise<any>{
    console.log(data);
      return axios.post('http://localhost:8080/api/user/register', data) ;  
  }

  
}

