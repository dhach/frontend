import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { Provider, providerFromApi } from '../_types/Provider';
import { Consumable, consumableFromApi } from '../_types/Consumable';
import { Device, deviceFromApi } from '../_types/Device';
import { Personnel, personnelFromApi } from '../_types/Personnel';
import { PersonnelQualification, personnelQualificationTo } from '../_types/PersonnelQualification';
import { personnelAreaTo } from '../_types/PersonnelArea';
import { DeviceCategory, deviceCategoryTo } from '../_types/DeviceCategory';
import { ConsumableCategory, consumableCategoryTo} from '../_types/ConsumableCategory';
import { LocaleService } from '../locale.service';
import { unitTo } from '../_types/Unit';


@Component({
  selector: 'app-offer-change',
  templateUrl: './offer-change.component.html',
  styleUrls: ['./offer-change.component.scss']
})
export class OfferChangeComponent implements OnInit {

  DeviceCategory = DeviceCategory;
  deviceCategoryToDE = deviceCategoryTo(this.localeService.locale);
  ConsumableCategory = ConsumableCategory;
  consumableCategoryTo = consumableCategoryTo(this.localeService.locale);
  PersonnelQualification = PersonnelQualification;
  personnelQualificationToDE = personnelQualificationTo(this.localeService.locale);
  personnelAreaToDE = personnelAreaTo(this.localeService.locale);
  unitTo = unitTo(this.localeService.locale);

  // Whether the offer was just created
  isNew: boolean;
  key: string;
  currentUrl: string;

  data: {
    provider: Provider,
    resources: Array<{ type: string, resource: Consumable | Device | Personnel, amountReason?: string}>
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fetchService: ApiService,
    private localeService: LocaleService,
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const isNewParam = this.route.snapshot.queryParamMap.get('new-created');
      this.isNew = isNewParam !== null && isNewParam !== undefined;

      this.key = params.key;
      this.currentUrl = environment.pageHosts[this.localeService.locale] + '/change/' + this.key;
      const response = await this.fetchService.reviewOffer(this.key);
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
            amountReason: null,
          }
        );
      });

      // Add consumables to data
      respData.consumables.forEach(element => {
        this.data.resources.push(
          {
            type: 'consumable',
            resource: consumableFromApi(element),
            amountReason: null,
          }
        );
      });
    });
  }

  getEnumValues(enumElement) {
    return Object.values(enumElement);
  }


  // Delete Content on submit
  // Currently button is deleted
  onSubmit(): void {
    this.fetchService.deleteOffer(this.key);
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
}
