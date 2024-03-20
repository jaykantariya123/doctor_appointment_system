import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class SymptomCheckerService {

  constructor() { }

  predict_disease(data: any): Promise<any> {
    console.log(data);
    return axios.post('http://127.0.0.1:5000/predict',data);
  }
}
