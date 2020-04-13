import {Component, Input, OnInit, Provider, SimpleChanges} from '@angular/core';
import {Device} from '../_types/Device';
import {Consumable} from '../_types/Consumable';
import {LocaleService} from '../locale.service';
import {ConsumableCategory, consumableCategoryTo} from '../_types/ConsumableCategory';
import {DeviceCategory, deviceCategoryTo} from '../_types/DeviceCategory';

@Component({
  selector: 'app-need-search-result',
  templateUrl: './need-search-result.component.html',
  styleUrls: ['./need-search-result.component.scss']
})
export class NeedSearchResultComponent implements OnInit {
  DeviceCategory = DeviceCategory;
  ConsumableCategory = ConsumableCategory;
  consumableCategoryToDE = consumableCategoryTo(this.localeService.locale);
  deviceCategoryToDE = deviceCategoryTo(this.localeService.locale);


  @Input() type: string;
  @Input() searchResults: Array<{
    resource: Device | Consumable,
  }>;

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


  formatAddress(address): string {
    const streetLine = `${address.street ?? ''} ${address.streetNumber ?? ''}`.trim() + '\n';
    const cityLine = `${address.postalCode ?? ''} ${address.city ?? ''}`.trim().concat('\n');
    const countryLine = `${address.country && (address.country !== 'Deutschland') ? address.country : ''}`;
    return (streetLine + cityLine + countryLine).trim();
  }

}
