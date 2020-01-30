import { Component, OnInit, Input } from '@angular/core';
import { TvService } from 'src/app/data-layer/tv.service';
import { Observable } from 'rxjs';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { MainState } from 'src/app/state/state/main.state';
import { tap, take } from 'rxjs/operators';
import { MediaService } from 'src/app/data-layer/media.service';
import { BackdropSizesEnum } from 'src/app/enums/image-enums';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-list-item',
  templateUrl: './my-list-item.component.html',
  styleUrls: ['./my-list-item.component.css']
})
export class MyListItemComponent implements OnInit {
  @Input() id: string;
  details$: Observable<ShowDetails>;

  @Emitter(MainState.removeElement)
  public removeElement: Emittable<string>;
  constructor(private tvSrv: TvService, private media: MediaService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.details$ = this.tvSrv.getDetails(this.id);
  }

  remove(id: string) {
    this.tvSrv.removeShow(id).pipe(
      take(1),
      tap( () => this.removeElement.emit(id))
    ).subscribe(
       () => this.toastr.info('Show succesfully removed!'),
    );
  }

  getImage(path: string) {
    return `url(${this.media.getBackdropImage(path, BackdropSizesEnum.w300)}) center center/cover no-repeat`;
  }

}
