import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datecustom'
})
export class DatecustomPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    if (args[args.length -1] === 'month') {
      const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return monthName[value.getMonth()];
    }
    if (args[args.length -1] === 'day') {
      return value.getDate();
    }
    return value.getFullYear();
  }

}
