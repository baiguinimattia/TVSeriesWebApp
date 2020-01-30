import { Component, OnInit, Input } from '@angular/core';
import { ShowResult } from '../../interfaces/show-result.interface';
import { ShowDetails } from '../../interfaces/show-details.interface';
import { MediaService } from '../../data-layer/media.service';
import { TvService } from '../../data-layer/tv.service';
import { PathsEnum, PosterSizesEnum } from '../../enums/image-enums';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: ShowResult;
  posterPath: string;
  constructor(private readonly mediaService: MediaService,
    private readonly tvService: TvService) { }

  ngOnInit() {
    this.posterPath = `${PathsEnum.default}${PosterSizesEnum.w300}${this.result.poster_path}`;
  }

}
