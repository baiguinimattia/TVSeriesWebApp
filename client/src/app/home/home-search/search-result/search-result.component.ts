import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../../data-layer/media.service';
import { PosterSizesEnum, PathsEnum } from '../../../enums/image-enums';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeSlide } from '@clr/angular';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: any;
  posterPath: string;
  constructor(private readonly mediaService: MediaService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.posterPath = PathsEnum.default + PosterSizesEnum.original + this.result.poster_path;
  }

}
