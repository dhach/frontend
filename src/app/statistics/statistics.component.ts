import { Component, Input, OnInit } from '@angular/core';
import { Unit, unitTo } from '../_types/Unit';
import { LocaleService } from '../locale.service';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  deviceCategories: Map<string, string>;
  consumableCategories: Map<string, string>;
  unitTo = unitTo(this.localeService.locale);

  @Input() data: {
    date: string,
    availableResources: {
      devices: Array<{ category: string, number: number }>,
      consumables: Array<{
        category: string,
        numbers: Array<{ unit: Unit, number: number }>
      }>,
      personnel: number,
    },
  };


  constructor(
      private localeService: LocaleService,
      private configurationService: ConfigurationService,
  ) {
    this.deviceCategories = configurationService.languageConstants.device;
    this.consumableCategories = configurationService.languageConstants.consumable;
  }


  ngOnInit(): void {
  }


  formatConsumableNumbers(numbers: Array<{ unit: Unit; number: number }>) {
    if (numbers.length === 0) {
      return '';
    }
    let s = numbers[0].number + ' ' + this.unitTo[numbers[0].unit];
    for (let i = 1; i < numbers.length; i++) {
      s += ', ' + numbers[i].number + ' ' + this.unitTo[numbers[i].unit];
    }
    return s;
  }
}
