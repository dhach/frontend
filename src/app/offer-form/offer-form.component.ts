import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Provider, providerToApi } from '../_types/Provider';
import { Consumable, consumableToApi } from '../_types/Consumable';
import { Device, deviceToApi } from '../_types/Device';
import { Personnel, personnelToApi } from '../_types/Personnel';
import { ReCaptchaWrapperComponent } from '../re-captcha-wrapper/re-captcha-wrapper.component';
import { ApiResponseError } from '../_types/ApiResponseError';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {

  @ViewChild(ReCaptchaWrapperComponent) reCaptchaComponent: ReCaptchaWrapperComponent;


  constructor(
    private fetchService: ApiService,
    private configurationService: ConfigurationService,
    private router: Router,
  ) {
  }


  provider: Provider = {
    address: {
      street: '',
      streetNumber: '',
      postalCode: '',
      city: '',
      country: this.configurationService.countryName,
    },
    institution: '',
    name: '',
    mail: '',
    phone: '',
    isPublic: false,
  };

  checkedDatenschutz = false;

  resources: Array<{ type: string, resource: Consumable | Device | Personnel, checkedEhrenamt?: boolean }> = [];

  recaptcha: string;

  error: ApiResponseError;


  ngOnInit(): void {
  }


  onSubmit() {
    this.sendRequest();
  }


  resolved(captchaResponse) {
    this.recaptcha = captchaResponse;
  }


  deleteItem(delGood) {
    if (this.resources.length !== 0) {
      this.resources.splice(delGood, 1);
    }
  }


  addPersonnel() {
    this.resources.push({
      type: 'personnel',
      resource: {
        qualification: null,
        institution: '',
        researchGroup: '',
        area: null,
        experienceWithPCR: false,
        notes: '',
        address: {
          postalCode: '',
          country: this.configurationService.countryName,
        }
      },
      checkedEhrenamt: false,
    });
  }


  addDevice() {
    this.resources.push({
      type: 'device',
      resource: {
        category: null,
        name: '',
        manufacturer: '',
        orderNumber: '',
        amount: undefined,
        notes: '',
        address: {
          postalCode: '',
          country: this.configurationService.countryName,
        }
      },
    });
  }


  addConsumable() {
    this.resources.push({
      type: 'consumable',
      resource: {
        category: null,
        name: '',
        manufacturer: '',
        orderNumber: '',
        amount: undefined,
        unit: '',
        notes: '',
        address: {
          postalCode: '',
          country: this.configurationService.countryName,
        }
      },
    });
  }


  isValid() {
    let valid = this.provider.institution && this.provider.name && this.provider.mail
      && this.provider.address.street && this.provider.address.streetNumber && this.provider.address.postalCode
      && this.provider.address.city && this.provider.address.country && this.checkedDatenschutz;
    for (const good of this.resources) {
      if (good.type === 'personnel') {
        const personnel = good.resource as Personnel;
        valid = valid && personnel.qualification && personnel.institution && personnel.area
          && personnel.address.postalCode && good.checkedEhrenamt;
      } else if (good.type === 'device') {
        const device = good.resource as Device;
        valid = !!(valid && device.category && device.name && device.address.postalCode && device.amount);
      } else if (good.type === 'consumable') {
        const consumable = good.resource as Consumable;
        valid = !!(valid && consumable.category && consumable.name && consumable.address.postalCode
          && consumable.amount && consumable.unit);
      }
    }
    valid = valid && (this.resources.length > 0);
    return valid;
  }


  isUnexpectedError(err) {
    if (!err?.message) {
      return false;
    }
    return typeof err.message === 'object';
  }


  async sendRequest() {
    if (!this.isValid()) {
      return;
    }

    const data = {
      provider: providerToApi(this.provider),
      personals: [],
      consumables: [],
      devices: []
    };
    // TODO Not sure why, but ispublic becomes a string...
    if (data.provider.ispublic instanceof String || typeof data.provider.ispublic === 'string') {
      data.provider.ispublic = data.provider.ispublic === 'true';
    }

    this.resources.forEach((elem) => {
      if (elem.type === 'personnel') {
        data.personals.push(personnelToApi(elem.resource as Personnel));
      } else if (elem.type === 'device') {
        data.devices.push(deviceToApi(elem.resource as Device));
      } else if (elem.type === 'consumable') {
        data.consumables.push(consumableToApi(elem.resource as Consumable));
      }
    });

    const response = await this.fetchService.sendOffer(data, this.recaptcha);
    this.reCaptchaComponent.reset();
    if (response.error) {
      this.error = response.error;
      return;
    }
    const key = response.data;
    await this.router.navigateByUrl('/change/' + key + '?new-created');
  }
}
