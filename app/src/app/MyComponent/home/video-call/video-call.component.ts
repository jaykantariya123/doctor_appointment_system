import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent {
  value: string = '';

  @Input() disabled: boolean = false;
  constructor(private router: Router) {
  }

  handleJoinRoom(value: any) {

  }
}
