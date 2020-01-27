import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Select } from '@ngxs/store';
import { MainState } from 'src/app/state/state/main.state';
import { Observable, Subscription, from } from 'rxjs';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { TvService } from 'src/app/data-layer/tv.service';
import { tap, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  config: SwiperConfigInterface = {
    initialSlide: 2,
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 3,
    slideToClickedSlide: true,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: false,
    roundLengths: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 50,
    breakpoints: {
      // when window width is >= 320px
      1200: {
        slidesPerView: 3
      },
      1000: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2
      },
      500: {
        slidesPerView: 1
      },
      320: {
        slidesPerView: 1
      }
    }
  };
  visitedDetails: Array<Observable<ShowDetails>> = new Array<Observable<ShowDetails>>();
  @Select(MainState.visits) visits$: Observable<Array<string>>;
  private subs: Subscription = new Subscription();
  constructor(private tvSrv: TvService) { }

  ngOnInit() {
    this.subs.add(
      this.visits$.pipe(
        take(1),
        switchMap((response: Array<string>) => from(response.reverse()).pipe(
          map( (response: string) => this.tvSrv.getDetails(response))
        ))
      ).subscribe( (response) => {
        this.visitedDetails.push(response);
      } ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
