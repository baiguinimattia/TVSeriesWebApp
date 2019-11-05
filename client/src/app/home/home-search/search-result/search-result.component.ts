import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../../data-layer/media.service';
import { PosterSizesEnum, PathsEnum } from '../../../enums/image-enums';
import { ShowResult } from '../../../interfaces/show-result.interface';
import { TvService } from '../../../data-layer/tv.service';
import { ShowDetails } from '../../../interfaces/show-details.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: ShowResult;
  posterPath: string;
  details: ShowDetails;
  constructor(private readonly mediaService: MediaService,
              private readonly tvService: TvService) { }

  ngOnInit() {
    console.log(this.result);
    this.posterPath = PathsEnum.default + PosterSizesEnum.original + this.result.backdrop_path;
  }

  getDetails(id: string) {
    this.tvService.getDetails(id).subscribe( (details) => {
      console.log(details);
      this.details = details;
    });
  }

}
