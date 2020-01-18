import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPageComponent } from './details-page.component';
import { PosterImageComponent } from './poster-image/poster-image.component';
import { ClarityModule } from '@clr/angular';
import { BannerComponent } from './banner/banner.component';
import { IntroComponent } from './intro/intro.component';
import { PersonListComponent } from './overview/person/person-list.component';
import { GuideButtonComponent } from './guide-button/guide-button.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DataTableComponent } from './overview/data-table/data-table.component';
import { PersonsListComponent } from './overview/persons-list/persons-list.component';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [DetailsPageComponent, PosterImageComponent, BannerComponent, IntroComponent, PersonListComponent, GuideButtonComponent, BottomMenuComponent, OverviewComponent, DetailsComponent, EpisodesComponent, RecommendationsComponent, DataTableComponent, PersonsListComponent],
  imports: [
    CommonModule,
    ClarityModule,
    DirectivesModule
  ],
  exports: [DetailsPageComponent]
})
export class DetailsPageModule { }
