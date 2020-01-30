import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListComponent } from './my-list.component';
import { MyListItemComponent } from './my-list-item/my-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { ClrIconModule } from '@clr/angular';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [MyListComponent, MyListItemComponent],
  imports: [
    CommonModule,
    ClrIconModule,
    AppRoutingModule
  ],
  exports: [MyListItemComponent],
})
export class MyListModule { }
