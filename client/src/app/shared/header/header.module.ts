import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeaderComponent, HeaderBarComponent, SearchBarComponent],
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }