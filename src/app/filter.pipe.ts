import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterpipe' })
export class FilterPipe implements PipeTransform {

    transform(items: any[], fName: string, fManufacturer: string, fMin: number, fMax: number, fNotes: string): any[] {
        if (!items) { return []; }
        if (!fName && !fManufacturer && !fMin && !fMax && !fNotes) { return items; }
        if (fName) {
            items = items.filter( it => {
                if (!it.resource.name) { return false; }
                return it.resource.name === fName;
            });
        }
        if (fManufacturer) {
            items = items.filter( it => {
                if (!it.resource.manufacturer) { return false; }
                return it.resource.manufacturer === fManufacturer;
            });
        }
        if (fMin) {
            items = items.filter( it => {
                return it.resource.amount >= fMin;
            });
        }
        if (fMax) {
            items = items.filter( it => {
                return it.resource.amount <= fMax;
            });
        }
        if (fNotes) {
            items = items.filter( it => {
                if (!it.resource.notes) { return false; }
                return it.resource.notes.toLocaleLowerCase().includes(fNotes.toLocaleLowerCase());
            });
        }
        return items;
    }

    constructor() {}
}
