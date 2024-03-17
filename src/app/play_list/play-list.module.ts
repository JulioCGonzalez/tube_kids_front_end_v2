import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayListRoutingModule } from './play-list-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PlayListPageComponent } from './pages/play-list-page/play-list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    PlayListPageComponent
  ],
  imports: [
    CommonModule,
    PlayListRoutingModule,
    ReactiveFormsModule, 
    SharedModule
  ]
})
export class PlayListModule { }
