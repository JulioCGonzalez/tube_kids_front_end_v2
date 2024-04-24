import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayListPageComponent } from './pages/play-list-page/play-list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegisterPlayListPageComponent } from './pages/register-play-list-page/register-play-list-page.component';
import { EditPlayListPageComponent } from './pages/edit-play-list-page/edit-play-list-page.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'playlists', component: PlayListPageComponent },
      { path: 'register', component: RegisterPlayListPageComponent },
      { path: 'edit', component: EditPlayListPageComponent },
      { path: '**', redirectTo: 'playlists' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayListRoutingModule { }
