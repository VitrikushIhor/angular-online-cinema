import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'convertDate',
})
export class ConvertMongoDatepipe implements PipeTransform {
  transform(date: string) {
    return new Date(date).toLocaleDateString('ua')
  }
}
