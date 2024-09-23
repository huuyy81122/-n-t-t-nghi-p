import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, method: string = 'round'): number {
    if (isNaN(value)) {
      return value;
    }

    switch(method) {
      case 'ceil':
        return Math.ceil(value);
      case 'floor':
        return Math.floor(value);
      case 'round':
      default:
        return Math.round(value);
    }
  }
}