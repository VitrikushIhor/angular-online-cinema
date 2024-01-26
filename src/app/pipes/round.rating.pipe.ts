import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roundRating',
})
export class RoundRatingPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}
