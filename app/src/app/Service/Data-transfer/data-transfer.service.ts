import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private userId: string='';
  
  constructor() { }
  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }
}
