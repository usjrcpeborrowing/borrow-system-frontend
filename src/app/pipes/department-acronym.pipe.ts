import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentAcronym',
})
export class DepartmentAcronymPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value
      .split('_')
      .map((word) => {
        if (word == 'computer') return 'CP';
        return word[0].toUpperCase();
      })
      .join('');
  }
}
