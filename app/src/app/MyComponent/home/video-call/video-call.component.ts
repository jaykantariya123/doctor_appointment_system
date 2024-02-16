import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent {
  value: string = '';

  constructor(private router: Router) {
  }

  handleJoinRoom(value: any) {

  }
}
