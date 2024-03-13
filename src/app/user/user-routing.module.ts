import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AvatarPageComponent } from './pages/avatar-page/avatar-page.component';
import { RegisterAvatarComponent } from './pages/register-avatar/register-avatar.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'avatar', component: AvatarPageComponent },
      { path: 'register', component: RegisterAvatarComponent },
      { path: '**', redirectTo: 'avatar' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
