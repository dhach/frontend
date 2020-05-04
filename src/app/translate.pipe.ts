import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from './locale.service';
import { environment } from '../environments/environment';


@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  itemLabels: {
    en: Map<string, string>,
    currentLanguage: Map<string, string>;
  };


  constructor(
    private localeService: LocaleService,
  ) {
    this.itemLabels = localeService.itemLabels;
  }


  transform(transUnitId: string): string {
    return this.itemLabels.currentLanguage.get(transUnitId)
      ?? this.itemLabels.en.get(transUnitId)
      ?? (environment.production ? '' : 'Error: translation ID not found!' );
  }

}
