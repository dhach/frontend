import {Component, Input, OnChanges, OnInit, Provider, SimpleChanges} from '@angular/core';
import {Device} from '../_types/Device';
import {Consumable} from '../_types/Consumable';
import {LocaleService} from '../locale.service';
import {ConsumableCategory, consumableCategoryTo} from '../_types/ConsumableCategory';
import {DeviceCategory, deviceCategoryTo} from '../_types/DeviceCategory';
import { Unit, unitTo } from '../_types/Unit';

@Component({
  selector: 'app-need-search-result',
  templateUrl: './need-search-result.component.html',
  styleUrls: ['./need-search-result.component.scss']
})
export class NeedSearchResultComponent implements OnInit, OnChanges {
  DeviceCategory = DeviceCategory;
  ConsumableCategory = ConsumableCategory;
  consumableCategoryToDE = consumableCategoryTo(this.localeService.locale);
  deviceCategoryToDE = deviceCategoryTo(this.localeService.locale);
  Unit = Unit;
  unitTo = unitTo(this.localeService.locale);


  @Input() type: string;
  @Input() searchResults: Array<{
    resource: Device | Consumable,
  }>;
  @Input() filter: {
    name: string,
    manufacturer: string,
    amount: {
      minimum: number,
      maximum: number,
    },
    notes: string,
  };

  showDetails: Array<boolean>;


  constructor(
      private localeService: LocaleService,
  ) {
  }


  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchResults) {
      this.showDetails = [];
      for (const _ of this.searchResults) {
        this.showDetails.push(false);
      }
    }
  }


  toggleShowDetails(i) {
    this.showDetails[i] = !this.showDetails[i];
  }
}
