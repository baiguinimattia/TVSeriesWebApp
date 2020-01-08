import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../data-layer/media.service';
import { BackdropSizesEnum } from '../../enums/image-enums';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';

@Component({
  selector: 'app-poster-image',
  templateUrl: './poster-image.component.html',
  styleUrls: ['./poster-image.component.css']
})
export class PosterImageComponent implements OnInit {
  @Input() details: ShowDetails;
  imageUrl: string;
  constructor(private readonly mediaService: MediaService) { }

  ngOnInit() {
    this.imageUrl = this.getImagePath(this.details.backdrop_path);
  }

  getImagePath(path: string) {
    return `#002538 url(${this.mediaService.getImagePath(this.details.backdrop_path, BackdropSizesEnum.original)}) no-repeat center center/cover`;
  }

}
