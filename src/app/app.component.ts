import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NeuralClassifier } from './classNeuralClassifier';
import { videoSizeInterface } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  label = '';
  hasMask = false;

  private classifier: NeuralClassifier = new NeuralClassifier();

  private getImage1: any;
  private getImage2: any;
  private getImage3: any;

  public isReady = false;

  private countControll = 1;
  private control = [false, false, false];
  private FPS = 10; // Frames da verificação


  constructor (){ }

  public videoElementRef: any;
  
  public videoSize: videoSizeInterface = { height: 0, width: 0 };
  public frameSize: videoSizeInterface = { height: 0, width: 0 };

  public setVideoRef = (event: any) => {
    this.videoElementRef = event;
  }

  public setImageFunction(func: any, caseValue: 1 | 2 | 3){
    switch (caseValue) {
      case 1:
        this.getImage1 = func;
        console.log(caseValue, func)
        break;
      case 2:
        this.getImage2 = func;
        break;
      case 3:
        this.getImage3 = func;
        break;
    }
  }

  
  @ViewChild("sectionVideo") 
  private sectionVideo!: ElementRef;


  async ngAfterViewInit() {
    this.setSizeOfSlots();
    await this.classifier.setup();
    this.isReady = true;

    setTimeout(()=>{
      this.startCapture();
    }, 2000)
  }

  private setSizeOfSlots() {
    this.videoSize['width'] = this.sectionVideo.nativeElement.clientWidth;
    this.videoSize['height'] = this.sectionVideo.nativeElement.clientHeight

    const frameSquare = this.videoSize.width > this.videoSize.height ? this.videoSize.height/3 : this.videoSize.width/3;

    this.frameSize.width = frameSquare;
    this.frameSize.height = frameSquare;
  }

  private startCapture = async () => {
    const image = await this.getImage(this.countControll);
    const predict = await this.classifier.predict(image);

    if(predict == 'mask') this.control[this.countControll] = true;
    else this.control[this.countControll] = false;

    const hasMask = this.control.reduce((cur, prev) => cur && prev);

    console.log(hasMask)

    this.hasMask = hasMask

    this.countControll = this.countControll > 2 ? 0 : this.countControll + 1;
    
    setTimeout(()=>{
      this.startCapture()
    }, 1000/this.FPS)
  }

  private getImage = (index: Number) => {
    if(index == 1){
      return this.getImage1();
    }else if(index==2){
      return this.getImage2();
    }else{
      return this.getImage3();
    }
  }
}
