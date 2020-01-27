import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { MediaService } from 'src/app/data-layer/media.service';
import { PosterSizesEnum } from 'src/app/enums/image-enums';

@Component({
  selector: 'app-slider-element',
  templateUrl: './slider-element.component.html',
  styleUrls: ['./slider-element.component.css']
})
export class SliderElementComponent implements OnInit, OnChanges {
  @Input() data: ShowDetails;
  constructor(private mediaService: MediaService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if(this.data) {
    }
  }
  getImage() {
    return `url("${this.mediaService.getPosterImage(this.data.poster_path, PosterSizesEnum.w300)}") center center/cover no-repeat`;
  }
}
