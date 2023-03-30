import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  // Este pipe inyecta el servicio
  constructor(
    private translate: TranslateService
  ){

  }

  transform(value: any): any {
    return this.translate.getTranslate(value) ? this.translate.getTranslate(value) : '';
  }

}
