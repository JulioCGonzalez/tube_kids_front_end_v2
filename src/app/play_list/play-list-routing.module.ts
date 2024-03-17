import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayListPageComponent } from './pages/play-list-page/play-list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'playlist', component: PlayListPageComponent },
      // { path: 'register', component: RegisterAvatarComponent },
      // { path: 'edit', component: EditAvatarComponent },
      { path: '**', redirectTo: 'playlist' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayListRoutingModule { }
