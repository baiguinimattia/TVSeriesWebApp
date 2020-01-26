import { Component, OnInit, Input } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { DetailsPageService } from '../details-page.service';
import { Observable } from 'rxjs';
import { ShowResult } from 'src/app/interfaces/show-result.interface';
import { tap, switchMap } from 'rxjs/operators';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { DetailsState } from 'src/app/state/state/details.state';
import { Select } from '@ngxs/store';
import { DetailsEnum } from 'src/app/enums/details-enum';
import { PathsEnum, PosterSizesEnum } from 'src/app/enums/image-enums';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  @Input() details: ShowDetails;

  @Select(DetailsState.getRecommendations) recommendations$: Observable<ShowResult[]>;
  @Select(DetailsState.getId) id$: Observable<string>;
  @Emitter(DetailsState.setRecommendations)
  public recommendations: Emittable<ShowResult[]>;

  @Emitter(DetailsState.setCurrentPage)
  public currentPage: Emittable<DetailsEnum>;

  constructor(private detailsService: DetailsPageService) { }

  ngOnInit() {
    this.id$.pipe(
      switchMap((id: string) => this.detailsService.getRecommendations(id).pipe(
        tap((response: ShowResult[]) => {
          this.recommendations.emit(response);
        }),
      ))
    ).subscribe();
  }

  goToOverview() {
    this.currentPage.emit(DetailsEnum.overview);
  }

  getPosterPath(path: string) {
    return `${PathsEnum.default}${PosterSizesEnum.original}${path}`;
  }

}
