import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeDetailsComponent } from './episode-details.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [EpisodeDetailsComponent],
  imports: [
    CommonModule,
    ClarityModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    EpisodeDetailsComponent
  ],
})
export class EpisodeDetailsModule { }
