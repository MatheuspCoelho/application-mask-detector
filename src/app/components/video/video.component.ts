import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { videoSizeInterface } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {

  public width!: Number;  
  public height!: Number;

  @ViewChild("video") public video!: ElementRef;

  @Output("videoRef") public videoRefEmmiter: any = new EventEmitter();

  @ViewChild("canvasPrimary") public canvasPrimary!: ElementRef;
    
  @Input('videoSize') set size(prop: videoSizeInterface ) {
    this.height = prop.height;
    this.width = prop.width;
  }

  ngOnInit(): void { 
    this.setupDevices();
  }
  
  ngAfterViewInit(): void {
    this.videoRefEmmiter.emit(this.video)
  }
  
  private async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        } else {
          console.error("You have no output video device");
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
