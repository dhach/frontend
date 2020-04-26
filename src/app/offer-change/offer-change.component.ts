import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Provider, providerFromApi, providerToApi } from '../_types/Provider';
import { Consumable, consumableFromApi, consumableToApi } from '../_types/Consumable';
import { Device, deviceFromApi, deviceToApi } from '../_types/Device';
import { Personnel, personnelFromApi, personnelToApi } from '../_types/Personnel';
import { LocaleService } from '../locale.service';
import { Unit, unitTo } from '../_types/Unit';
import { Utils } from '../Utils';
import { ConfigurationService } from '../configuration.service';
import { APP_BASE_HREF } from '@angular/common';
import { AddressFormat } from '../_types/AddressFormat';


@Component({
  selector: 'app-offer-change',
  templateUrl: './offer-change.component.html',
  styleUrls: ['./offer-change.component.scss']
})
export class OfferChangeComponent implements OnInit {

  addressFormat: AddressFormat;
  deviceCategories: Map<string, string>;
  consumableCategories: Map<string, string>;
  personnelQualifications: Map<string, string>;
  personnelAreas: Map<string, string>;
  personnelQualificationsKeys: Array<string>;
  personnelAreasKeys: Array<string>;
  Unit = Unit;
  unitTo = unitTo(this.localeService.language);


  isNew: boolean; // Whether the offer was just created
  key: string;
  currentUrl: string;

  data: {
    provider: Provider,
    resources: Array<{ type: string, resource: Consumable | Device | Personnel}>
  };

  savedData: { // This is an instance of the data as it is currently saved.
    provider: Provider,
    resources: Array<{ type: string, resource: Consumable | Device | Personnel}>
  };

  isInEditMode: {
    provider: boolean,
    resources: Array<boolean>,
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private localeService: LocaleService,
    private configurationService: ConfigurationService,
    @Inject(APP_BASE_HREF) private baseHref: string,
  ) {
    this.addressFormat = configurationService.addressFormat;
    this.deviceCategories = configurationService.languageConstants.device;
    this.consumableCategories = configurationService.languageConstants.consumable;
    this.personnelAreas = configurationService.languageConstants.personnelArea;
    this.personnelQualifications = configurationService.languageConstants.personnelQualification;
    this.personnelAreasKeys = Array.from(this.personnelAreas.keys());
    this.personnelQualificationsKeys = Array.from(this.personnelQualifications.keys());
  }


  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const isNewParam = this.route.snapshot.queryParamMap.get('new-created');
      this.isNew = isNewParam !== null && isNewParam !== undefined;

      this.key = params.key;
      this.currentUrl = window.origin + this.baseHref + 'change/' + this.key;
      const response = await this.apiService.reviewOffer(this.key);
      if (response.error) {
        throw new Error('Unexpected / unhandled error');
      }
      const respData = response.data;
      this.data = {
        provider: providerFromApi(respData.provider),
        resources: []
      };

      // Add personnel to data
      respData.personals.forEach(element => {
        this.data.resources.push(
          {
            type: 'personnel',
            resource: personnelFromApi(element),
          }
        );
      });

      // Add devices to data
      respData.devices.forEach(element => {
        this.data.resources.push(
          {
            type: 'device',
            resource: deviceFromApi(element),
          }
        );
      });

      // Add consumables to data
      respData.consumables.forEach(element => {
        this.data.resources.push(
          {
            type: 'consumable',
            resource: consumableFromApi(element),
          }
        );
      });

      this.savedData = Utils.simpleDeepCopy(this.data);

      // At the beginning, the blocks are not in edit mode.
      this.isInEditMode = {
        provider: false,
        resources: new Array(this.data.resources.length).fill(false),
      };
    });
  }

  getEnumValues(enumElement) {
    return Object.values(enumElement);
  }


  // Delete Content on submit
  // Currently button is deleted
  onSubmit(): void {
    this.apiService.deleteOffer(this.key);
    // Redirect to home page
    this.router.navigateByUrl('');
  }


  // Here for ater use of deleting single entries
  deleteItem(delGood: number): void {
    if (this.data.resources.length !== 0) {
      this.data.resources.splice(delGood, 1);
    }
  }


  toP(r: { type: string; resource: Consumable | Device | Personnel }): Personnel {
    return r.resource as Personnel;
  }

  toC(r: { type: string; resource: Consumable | Device | Personnel }): Consumable {
    return r.resource as Consumable;
  }


  toD(r: { type: string; resource: Consumable | Device | Personnel }): Device {
    return r.resource as Device;
  }


  enterEditModeProvider() {
    this.isInEditMode.provider = true;
  }


  resetProvider() {
    this.data.provider = Utils.simpleDeepCopy(this.savedData.provider);
    this.isInEditMode.provider = false;
  }


  async saveProvider() {
    const response = await this.apiService.editProvider(this.key, providerToApi(this.data.provider));
    if (response.error) {
      // TODO
      throw new Error();
    }
    this.savedData.provider = Utils.simpleDeepCopy(this.data.provider);
    this.isInEditMode.provider = false;
  }


  enterEditModeResource(index: number) {
    this.isInEditMode.resources[index] = true;
  }


  resetResource(index: number) {
    this.data.resources[index] = Utils.simpleDeepCopy(this.savedData.resources[index]);
    this.isInEditMode.resources[index] = false;
  }


  async saveResource(index: number) {
    const resource = this.data.resources[index];
    let response;
    switch (resource.type) {
      case 'personnel':
        response = await this.apiService.editPersonnel(
          this.key,
          resource.resource.id,
          personnelToApi(resource.resource as Personnel)
        );
        break;
      case 'device':
        response = await this.apiService.editDevice(
          this.key,
          resource.resource.id,
          deviceToApi(resource.resource as Device)
        );
        break;
      case 'consumable':
        response = await this.apiService.editConsumable(
          this.key,
          resource.resource.id,
          consumableToApi(resource.resource as Consumable)
        );
        break;
    }
    if (response.error) {
      // TODO
      throw new Error();
    }
    this.savedData.resources[index] = Utils.simpleDeepCopy(resource);
    this.isInEditMode.resources[index] = false;
  }


  async editResourceAmount(index: number, reason?: string) {
    const resource = this.data.resources[index];
    let r;
    let response;
    switch (resource.type) {
      case 'device':
        r = resource.resource as Device;
        response = await this.apiService.editDeviceAmount(this.key, r.id, r.amount, reason);
        break;
      case 'consumable':
        r = resource.resource as Consumable;
        response = await this.apiService.editConsumableAmount(this.key, r.id, r.amount, reason);
        break;
    }
    if (response.error) {
      // TODO
      throw new Error();
    }
    this.savedData.resources[index] = Utils.simpleDeepCopy(resource);
  }


  async deleteResource(index: number, reason) {
    const resource = this.data.resources[index];
    let response;
    switch (resource.type) {
      case 'personnel':
        response = await this.apiService.deletePersonnel(this.key, resource.resource.id, reason);
        break;
      case 'device':
        response = await this.apiService.deleteDevice(this.key, resource.resource.id, reason);
        break;
      case 'consumable':
        response = await this.apiService.deleteConsumable(this.key, resource.resource.id, reason);
        break;
    }
    if (response.error) {
      // TODO
      throw new Error();
    }
    this.data.resources.splice(index, 1);
    this.savedData.resources.splice(index, 1);
  }
}
