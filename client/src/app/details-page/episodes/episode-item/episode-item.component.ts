import { Component, OnInit, Input } from '@angular/core';
import { EpisodeDetailed } from 'src/app/interfaces/season.interface';
import { DetailsPageService } from '../../details-page.service';

@Component({
  selector: 'app-episode-item',
  templateUrl: './episode-item.component.html',
  styleUrls: ['./episode-item.component.css']
})
export class EpisodeItemComponent implements OnInit {
  @Input('episode') episode: EpisodeDetailed;
  ifHovered = true;
  constructor(private detailsSrv: DetailsPageService) {
   }

  ngOnInit() {
  }

  mouseEnter() {
    this.ifHovered = true;
  }

  mouseLeave() {
    this.ifHovered = true;
  }

  getImagePath(path: string) {
    return this.detailsSrv.getStillPath(path);
  }

  toEpisodeDetails(episodeId: string) {
  }

}
