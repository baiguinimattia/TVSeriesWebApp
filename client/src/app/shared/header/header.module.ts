import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionMenuComponent } from './action-menu/action-menu.component';


@NgModule({
  declarations: [HeaderComponent, HeaderBarComponent, ActionMenuComponent],
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    ActionMenuComponent
  ]
})
export class HeaderModule { }
