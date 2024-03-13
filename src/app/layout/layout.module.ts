import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutMenuComponent } from './layout-menu/layout-menu.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    LayoutMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    LayoutMenuComponent
  ]
})
export class LayoutModule { }
