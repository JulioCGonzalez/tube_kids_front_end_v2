import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { authCanActivateGuard } from './shared/guards/auth-can-activate.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule ),
    canActivate: [authCanActivateGuard]
  },
  {
    path: 'playlists',
    loadChildren: () => import('./play_list/play-list.module').then( m => m.PlayListModule ),
    canActivate: [authCanActivateGuard]
  },
  {
    path: 'videos',
    loadChildren: () => import('./video/video.module').then( m => m.VideoModule ),
    canActivate: [authCanActivateGuard]
  },
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
