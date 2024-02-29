import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CardModule,
    PasswordModule,
    TableModule
  ],
  exports: [
    MenubarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CardModule,
    PasswordModule,
    TableModule
  ]
})
export class PrimengModule { }