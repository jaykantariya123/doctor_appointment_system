import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  roomId: string = '';
  @ViewChild('zegoElement') zegoElement: ElementRef | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['roomId'];
      console.log(this.roomId);
    });
    this.myMeeting();

  }

  myMeeting(): void {
    const appID = 1697498303;
    const serverSecret = "3326695e7e0bd99e83739c7393716779";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomId, Date.now().toString(), "jay");
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: this.zegoElement?.nativeElement,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3000/room/${this.roomId}`
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall
      }
    })
  }

}
