import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { ToastContainerModule } from 'ngx-toastr';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    ToastContainerModule,
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
