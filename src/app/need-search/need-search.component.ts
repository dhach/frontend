import {Component, OnInit, Provider} from '@angular/core';
import {ConsumableCategory, consumableCategoryTo} from '../_types/ConsumableCategory';
import { unitTo } from '../_types/Unit';
import { LocaleService } from '../locale.service';

@Component({
  selector: 'app-need-search',
  templateUrl: './need-search.component.html',
  styleUrls: ['./need-search.component.scss']
})
export class NeedSearchComponent implements OnInit {
  consumableCategoryToDE = consumableCategoryTo(this.localeService.locale);
  uniToDE = unitTo(this.localeService.locale);

  // Testdaten
  results: Array<{
    searcher: {
      institution: string;
      name: string,
      mail: string,
      phone: string,
      postalCode: string,
    },
    resources: Array<{
      category: ConsumableCategory,
      name: string,
      manufacturer: string,
      orderNumber: string,
      amount: number,
      unit: string,
    }>,
  }>;
  constructor(
    private localeService: LocaleService,
  ) {
    // Testdaten
    this.results = [
      {
        searcher: {
          institution: 'Institution',
          name: 'Name',
          mail: 'mail@addresse.de',
          phone: 'string',
          postalCode: '22523',
        },
        resources: [
          {
            category: ConsumableCategory.MASKE,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 6,
            unit: 'Stück',
          }, {
            category: ConsumableCategory.SCHUTZBRILLE,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 3,
            unit: 'Stück',
          }
        ],
      }, {
        searcher: {
          institution: 'Institution',
          name: 'Name',
          mail: 'mail@addresse.de',
          phone: 'string',
          postalCode: '22523',
        },
        resources: [
          {
            category: ConsumableCategory.HANDSCHUHE,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 12,
            unit: 'Stück',
          }, {
            category: ConsumableCategory.REAKTIONSGEFAESSE,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 1,
            unit: 'Stück',
          }
        ],
      }
    ];
  }

  ngOnInit(): void {}

}
