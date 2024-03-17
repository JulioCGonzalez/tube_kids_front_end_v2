import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AvatarPageComponent } from './pages/avatar-page/avatar-page.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterAvatarComponent } from './pages/register-avatar/register-avatar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAvatarComponent } from './pages/edit-avatar/edit-avatar.component';
import { AvatarPlayListComponent } from './pages/avatar-play-list/avatar-play-list.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AvatarPageComponent,
    RegisterAvatarComponent,
    EditAvatarComponent,
    AvatarPlayListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule, 
    SharedModule
  ]
})
export class UserModule { }
