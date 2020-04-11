import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from './locale.service';
import {deviceCategoryTo} from './_types/DeviceCategory';
import {consumableCategoryTo} from './_types/ConsumableCategory';

@Pipe({ name: 'filterpipe' })
export class FilterPipe implements PipeTransform {

    consumableCategoryToDE = consumableCategoryTo(this.localeService.locale);
    deviceCategoryToDE = deviceCategoryTo(this.localeService.locale);

    transform(items: any[], searchText: string): any[] {
        if (!items) { return []; }
        if (!searchText) { return items; }
        return items.filter( it => {
            return it.category === searchText || it.category === searchText;
        });
    }

    constructor(
        private localeService: LocaleService,
    ) {}
}
