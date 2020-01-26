import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeDetailsComponent } from './episode-details.component';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EpisodeDetailsComponent],
  imports: [
    CommonModule,
    ClarityModule,
    SharedModule
  ],
  exports: [
    EpisodeDetailsComponent
  ],
})
export class EpisodeDetailsModule { }
