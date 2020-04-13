import * as Papa from 'papaparse/papaparse.min.js';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { Device, deviceToApi } from '../_types/Device';
import { Consumable, consumableToApi } from '../_types/Consumable';
import { Provider, providerToApi } from '../_types/Provider';
import { Unit } from '../_types/Unit';
import { ApiService } from '../api.service';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-admin-demand-import',
  templateUrl: './admin-demand-import.component.html',
  styleUrls: ['./admin-demand-import.component.scss']
})
export class AdminDemandImportComponent implements OnInit {

  deviceCategories: Map<string, string>;
  consumableCategories: Map<string, string>;

  provider: Provider = {
    institution: '',
    name: '',
    mail: '',
    phone: '',
    address: {
      street: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      country: 'Deutschland'
    }
  };
  devices: Array<Device>;
  consumables: Array<Consumable>;

  deviceCsvParseErrors: Array<{
    message: string,
  }>;
  consumableCsvParseErrors: Array<{
    message: string,
  }>;

  submitted = false;
  token: string;
  unexpectedError = false;


  constructor(
    private router: Router,
    private adminService: AdminService,
    private apiService: ApiService,
    private configurationService: ConfigurationService,
  ) {
    this.deviceCategories = configurationService.languageConstants.device;
    this.consumableCategories = configurationService.languageConstants.consumable;
  }


  async ngOnInit(): Promise<void> {
    if (!this.adminService.isAdmin()) {
      await this.router.navigateByUrl('/admin');
    }
  }


  isValid(): boolean {
    return !!(
      (this.devices || this.consumables) && this.provider.name
      && this.provider.institution && this.provider.mail
    );
  }


  async addDeviceFile(target) {
    this.devices = undefined;
    this.deviceCsvParseErrors = undefined;
    if (target.files.length === 0) {
      return;
    }
    const text = await target.files[0].text();
    const CSV_HEADER = 'category,name,manufacturer,amount,notes\n';
    const parseResult = Papa.parse(CSV_HEADER + text, { skipEmptyLines: true, header: true, delimiter: ',' });
    if (parseResult.errors && parseResult.errors.length > 0) {
      this.deviceCsvParseErrors = parseResult.errors;
      target.value = '';
      return;
    }
    try {
      this.devices = parseResult.data.map(({ category, name, manufacturer, amount, notes }) => {
        if (!this.deviceCategories.has(category)) {
          throw new Error('Invalid device category: ' + category);
        }
        const device: Device = {
          category: category.trim(),
          name: name.trim(),
          manufacturer: manufacturer.trim(),
          amount: Number.parseInt(amount.trim(), 10),
          notes: notes.trim()
        };
        if (!device.category || !(device.amount > 0)) {
          throw new Error('Required data is missing.');
        }
        return device;
      });
    } catch (e) {
      target.value = '';
      this.deviceCsvParseErrors = [{
        message: e.message,
      }];
    }
  }


  async addConsumableFile(target) {
    this.consumables = undefined;
    this.consumableCsvParseErrors = undefined;
    if (target.files.length === 0) {
      return;
    }
    const text = await target.files[0].text();
    const CSV_HEADER = 'category,name,manufacturer,amount,unit,notes\n';
    const parseResult = Papa.parse(CSV_HEADER + text, { skipEmptyLines: true, header: true, delimiter: ',' });
    if (parseResult.errors && parseResult.errors.length > 0) {
      this.consumableCsvParseErrors = parseResult.errors;
      target.value = '';
      return;
    }
    try {
      this.consumables = parseResult.data.map(({ category, name, manufacturer, amount, unit, notes }) => {
        if (!this.consumableCategories.has(category)) {
          throw new Error('Invalid consumable category: ' + category);
        }
        if (!Object.values(Unit).includes(unit)) {
          throw new Error('Invalid consumable unit: ' + unit);
        }
        const consumable: Consumable = {
          category: category.trim(),
          name: name.trim(),
          manufacturer: manufacturer.trim(),
          amount: Number.parseInt(amount.trim(), 10),
          unit: unit.trim(),
          notes: notes.trim()
        };
        if (!consumable.category || !(consumable.amount > 0) || !consumable.unit) {
          throw new Error('Required data is missing.');
        }
        return consumable;
      });
    } catch (e) {
      target.value = '';
      this.consumableCsvParseErrors = [{
        message: e.message,
      }];
    }
  }


  async onSubmit() {
    this.unexpectedError = false;
    const data = {
      adminKey: this.adminService.adminKey,
      data: {
        provider: providerToApi(this.provider),
        devices: this.devices?.map(deviceToApi),
        consumables: this.consumables?.map(consumableToApi),
      },
    };
    if (data.data.provider.address && !data.data.provider.address.postalCode) {
      data.data.provider.address = null;
    }
    const response = await this.apiService.addDemand(data);
    if (response.error) {
      this.unexpectedError = true;
      return;
    }
    this.submitted = true;
    this.token = response.data;
  }
}
