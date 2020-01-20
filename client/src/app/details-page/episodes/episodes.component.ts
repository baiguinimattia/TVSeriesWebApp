import { Component, OnInit, Input } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { DetailsPageService } from '../details-page.service';
import { Observable } from 'rxjs';
import { SeasonDetailed } from 'src/app/interfaces/season.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
  @Input() details: ShowDetails;
  public season$: Observable<SeasonDetailed>;
  constructor(private readonly detailsSrv: DetailsPageService) { }

  ngOnInit() {
    this.getEpisodes(this.details.seasons[0].season_number);
  }

  getEpisodes(id: number) {
    this.season$ =  this.detailsSrv.getEpisodesBySeasonNo(this.details.id, id).pipe(
      tap( result => console.log(result)),
    )
  }

  getImagePath(path: string) {
    return this.detailsSrv.getStillPath(path);
  }

}
