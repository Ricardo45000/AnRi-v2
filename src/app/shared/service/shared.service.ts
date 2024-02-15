import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  

  private filterRatingSubject = new Subject<number>();

  filterRating$ = this.filterRatingSubject.asObservable();

  sendFilterRating(rating: number) {
    this.filterRatingSubject.next(rating);
  }


}
