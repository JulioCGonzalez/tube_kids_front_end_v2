import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EditVideoPageComponent } from './pages/edit-video-page/edit-video-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { RegisterVideoPageComponent } from './pages/register-video-page/register-video-page.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'videos', component: VideoPageComponent },
      { path: 'register', component: RegisterVideoPageComponent },
      { path: 'edit', component: EditVideoPageComponent },
      { path: '**', redirectTo: 'videos' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
