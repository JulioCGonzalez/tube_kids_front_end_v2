import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
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
    TableModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    DropdownModule,
    MultiSelectModule
  ],
  exports: [
    MenubarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CardModule,
    PasswordModule,
    TableModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class PrimengModule { }