import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayListRoutingModule } from './play-list-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PlayListPageComponent } from './pages/play-list-page/play-list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterPlayListPageComponent } from './pages/register-play-list-page/register-play-list-page.component';
import { EditPlayListPageComponent } from './pages/edit-play-list-page/edit-play-list-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    PlayListPageComponent,
    RegisterPlayListPageComponent,
    EditPlayListPageComponent
  ],
  imports: [
    CommonModule,
    PlayListRoutingModule,
    ReactiveFormsModule, 
    SharedModule
  ]
})
export class PlayListModule { }
