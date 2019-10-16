import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HeaderComponent, HeaderBarComponent],
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
