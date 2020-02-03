import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/popular.interface';
import { MediaService } from 'src/app/data-layer/media.service';
import { BackdropSizesEnum } from 'src/app/enums/image-enums';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  @Input() show: Result;
  constructor(private mediaSrv: MediaService) { }

  ngOnInit() {
    console.log(this.show);
  }
  getBackgroundUrl(): string {
    return `url(${this.mediaSrv.getBackdropImage(this.show.backdrop_path, BackdropSizesEnum.w780)}) top center/cover no-repeat`;
  }
}
