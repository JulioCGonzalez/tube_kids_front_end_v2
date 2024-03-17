import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { EditVideoPageComponent } from './pages/edit-video-page/edit-video-page.component';
import { RegisterVideoPageComponent } from './pages/register-video-page/register-video-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    VideoPageComponent,
    EditVideoPageComponent,
    RegisterVideoPageComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    ReactiveFormsModule, 
    SharedModule
  ]
})
export class VideoModule { }
