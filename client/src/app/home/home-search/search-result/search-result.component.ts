import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../../data-layer/media.service';
import { PosterSizesEnum } from '../../../enums/image-enums';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: any;
  posterPath: string;
  constructor(private readonly mediaService: MediaService) { }

  ngOnInit() {
    console.log(this.result);
    this.mediaService.getPosterPath(this.result.poster_path, PosterSizesEnum.original).subscribe( (response) => {
      this.posterPath = response;
    },
    (error) => console.log(error));
  }

}
