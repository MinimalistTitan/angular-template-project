import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'when',
  standalone: true
})
export class WhenPipe implements PipeTransform {
  transform(
    items: any[],
    field: string,
    value: any
  ): any {
    if (!items || !field) {
      return items;
    }
    if(typeof(value) === 'boolean'){
      if (value){
        return items.filter((item) => !!item[field]);
      }else{
        return items.filter((item) => !item[field]);
      }
      
    }
    return items.filter((item) => item[field] === value);
  }
}
