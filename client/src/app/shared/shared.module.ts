import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { AlertModule } from './header/alert/alert.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    AlertModule
  ],
  exports: [
    HeaderModule,
    AlertModule
  ]
})
export class SharedModule { }
