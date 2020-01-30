import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EpisodeDetailsService } from './episode-details.service';
import { EpisodeDetailed } from 'src/app/interfaces/season.interface';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { DetailsState } from 'src/app/state/state/details.state';
import { ImdbDetails } from 'src/app/interfaces/imdb-details.interface';
import { EpisodeImages } from 'src/app/interfaces/episode-interface';
import { StillSizesEnum } from 'src/app/enums/image-enums';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit, OnDestroy {
  episode$: Observable<EpisodeDetailed>;
  @Select(DetailsState.getImdbDetails) details$: Observable<ImdbDetails>;
  episodeImages$: Observable<EpisodeImages>;
  private subs: Subscription = new Subscription();
  images: string[] = [];
  id: string;

  constructor(private route: ActivatedRoute, private readonly episodeSrv: EpisodeDetailsService) { }
  ngOnInit() {
    this.route.params.pipe(
      tap(response => {
        this.id = response.id;
        this.episodeSrv.getEpisodesImages(response.id, response.sno, response.eno).pipe(
          tap(response => {
            response.stills.forEach(element => {
              this.images.push(this.episodeSrv.getStillPath(element.file_path, StillSizesEnum.original));
            })
          }),
        ).subscribe();
        this.episode$ = this.episodeSrv.getEpisode(response.id, response.sno, response.eno).pipe(
          tap(response => console.log(response)),
        );
      })
    ).subscribe();
    this.details$.subscribe(response => {});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
