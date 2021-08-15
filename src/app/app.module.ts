import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrameComponent } from './components/frame/frame.component';
import { VideoComponent } from './components/video/video.component';
import { AcessComponent } from './components/acess/acess.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    VideoComponent,
    AcessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    VideoComponent,
    FrameComponent,
    AcessComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
