import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { browser } from '@tensorflow/tfjs';
import { videoSizeInterface } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  public width!: Number;
  public height!: Number;

  public videoElementRef!: any;
  
  constructor() { }
  
  @ViewChild("canvas") public canvas!: ElementRef;

  ngOnInit(): void {
    this.getImageEventEmmiter.emit(this.getImage);
  }

  @Input('frameSize') set size(prop: videoSizeInterface ) {
    this.height = prop.height;
    this.width = prop.width;
  }

  @Input('videoElement') set videoElement(nativeElement: any) {
    this.videoElementRef = nativeElement;
  }

  @Output('getImageRef') getImageEventEmmiter: EventEmitter<any> = new EventEmitter();

  public getImage = () =>{
    this.canvas.nativeElement
      .getContext("2d").drawImage(this.videoElementRef.nativeElement, 0, 0, this.width, this.height);

    const image = browser.fromPixels(this.canvas.nativeElement);

    return image;
  }
}
