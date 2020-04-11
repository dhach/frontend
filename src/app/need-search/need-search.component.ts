import {Component, OnInit, Provider} from '@angular/core';
import {ConsumableCategory, consumableCategoryTo} from '../_types/ConsumableCategory';
import { unitTo } from '../_types/Unit';
import { LocaleService } from '../locale.service';
import {DeviceCategory, deviceCategoryTo} from '../_types/DeviceCategory';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-need-search',
  templateUrl: './need-search.component.html',
  styleUrls: ['./need-search.component.scss']
})

export class NeedSearchComponent implements OnInit {

  DeviceCategory = DeviceCategory;
  ConsumableCategory = ConsumableCategory;
  consumableCategoryToDE = consumableCategoryTo(this.localeService.locale);
  deviceCategoryToDE = deviceCategoryTo(this.localeService.locale);
  uniToDE = unitTo(this.localeService.locale);

  // Testdaten
  consumables: Array<{
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
  devices: Array<{
    searcher: {
      institution: string;
      name: string,
      mail: string,
      phone: string,
      postalCode: string,
    },
    resources: Array<{
      category: DeviceCategory,
      name: string,
      manufacturer: string,
      orderNumber: string,
      amount: number,
    }>,
  }>;
  constructor(
    private localeService: LocaleService,
  ) {
    // Testdaten
    this.consumables = [
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
            unit: 'Packung',
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

    this.devices = [
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
            category: DeviceCategory.PCR_THERMOCYCLER,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 1,
          }, {
            category: DeviceCategory.ZENTRIFUGE,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 4,
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
            category: DeviceCategory.VORTEXER,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 2,
          }, {
            category: DeviceCategory.PIPETTE,
            name: 'Name',
            manufacturer: 'Hersteller',
            orderNumber: 'Seriennummer',
            amount: 6,
          }
        ],
      }
    ];
  }

  getEnumValues(enumElement) {
    return Object.values(enumElement);
  }

  ngOnInit(): void {}

}
