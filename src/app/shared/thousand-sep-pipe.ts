import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSep',
  standalone: true
})
export class ThousandSepPipe implements PipeTransform {
  transform(value: number | string): string {
    const n = typeof value === 'string' ? Number(value) : value;
    return isNaN(n as number) ? String(value) : (n as number).toLocaleString('fr-FR');
  }
}
