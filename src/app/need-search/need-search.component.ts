import {Component, OnInit, Provider} from '@angular/core';
import {ConsumableCategory, consumableCategoryTo} from '../_types/ConsumableCategory';
import { LocaleService } from '../locale.service';
import {DeviceCategory, deviceCategoryTo} from '../_types/DeviceCategory';
import {Device, deviceFromApi} from '../_types/Device';
import {Consumable, consumableFromApi} from '../_types/Consumable';
import {ApiResponseError} from '../_types/ApiResponseError';
import {ApiService} from '../api.service';

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

  searchToggle = 'device';
  loading = false;
  searchType: string;
  categoryType: string;

  results: Array<{
    resource: Device | Consumable,
  }>;
  Uniqs: {
    name: Set<string>,
    manufacturer: Set<string>,
  };
  filter: {
    name: string,
    manufacturer: string,
    amount: {
      minimum: number,
      maximum: number,
    },
    notes: string,
  };

  error: ApiResponseError;

  constructor(
    private localeService: LocaleService,
    private fetchService: ApiService,
  ) {
    this.Uniqs = {
      name: new Set<string>(),
      manufacturer: new Set<string>(),
    };

    this.filter = {
      name: '',
      manufacturer: '',
      amount: {
        minimum: 0,
        maximum: 0,
      },
      notes: '',
    };
  }

  getEnumValues(enumElement) {
    return Object.values(enumElement);
  }

  async onSubmit(c: string, d: string) {
    this.loading = true;
    this.error = undefined;
    let data;
    if (c) {
      this.searchType = 'consumable';
      data = {
        category: c
      };
    } else if (d) {
      this.searchType = 'device';
      data = {
        category: d,
      };
    }

    const response = await this.fetchService.getDemands(this.searchType, data);
    if (response.error) {
      this.error = response.error;
      return;
    }
    const results = response.data;
    this.results = results.map((r) => {
      let resource;
      if (this.searchType === 'device') {
        resource = deviceFromApi(r.resource);
      } else if (this.searchType === 'consumable') {
        resource = consumableFromApi(r.resource);
      }
      this.loading = false;
      return {resource};
    });
    this.Uniqs.name.clear();
    this.Uniqs.manufacturer.clear();
    this.results.forEach((elem) => {
      if (elem.resource.name) { this.Uniqs.name.add(elem.resource.name); }
      if (elem.resource.manufacturer) { this.Uniqs.manufacturer.add(elem.resource.manufacturer); }
    });
    this.clearFilter();
  }
  isUnexpectedError(err) {
    if (!err?.message) {
      return false;
    }
    return typeof err.message === 'object';
  }

  clearFilter() {
    this.filter = {
      name: '',
      manufacturer: '',
      amount: {
        minimum: 0,
        maximum: 0,
      },
      notes: '',
    };
  }

  ngOnInit(): void {}

}
