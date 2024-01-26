import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genresList'
})
export class GenresListPipe implements PipeTransform {
  transform(index: number, length: number, name: string): string {
    return index + 1 === length ? name : name + ', ';
  }
}
