import { Component, OnInit, Provider } from '@angular/core';
import { ApiService } from '../api.service';
import { Personnel, personnelFromApi } from '../_types/Personnel';
import { Device, deviceFromApi } from '../_types/Device';
import { Consumable, consumableFromApi } from '../_types/Consumable';
import { providerFromApi } from '../_types/Provider';
import { LocaleService } from '../locale.service';
import { ApiResponseError } from '../_types/ApiResponseError';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.scss']
})
export class OfferSearchComponent implements OnInit {


  deviceCategories: Map<string, string>;
  consumableCategories: Map<string, string>;
  deviceCategoriesKeys: Array<string>;
  consumableCategoriesKeys: Array<string>;
  personnelQualifications: Map<string, string>;
  personnelAreas: Map<string, string>;
  personnelQualificationsKeys: Array<string>;
  personnelAreasKeys: Array<string>;

  DISTANCE_KILOMETER = 70;

  searchType: string;
  searchQuery;
  postalCode = '';
  results: Array<{
    provider?: Provider,
    resource: Personnel | Device | Consumable,
    distance: number,
  }>;

  error: ApiResponseError;


  constructor(
    private localeService: LocaleService,
    private fetchService: ApiService,
    private configurationService: ConfigurationService,
  ) {
    this.deviceCategories = this.configurationService.languageConstants.device;
    this.consumableCategories = this.configurationService.languageConstants.consumable;
    this.deviceCategoriesKeys = Array.from(this.deviceCategories.keys());
    this.consumableCategoriesKeys = Array.from(this.consumableCategories.keys());

    this.personnelAreas = configurationService.languageConstants.personnelArea;
    this.personnelQualifications = configurationService.languageConstants.personnelQualification;
    this.personnelAreasKeys = Array.from(this.personnelAreas.keys());
    this.personnelQualificationsKeys = Array.from(this.personnelQualifications.keys());

    this.setType('personnel');
  }


  ngOnInit(): void {
  }


  getEnumValues(enumElement) {
    return Object.values(enumElement);
  }


  setType(type) {
    if (this.searchType !== type) {
      this.searchType = type;
      this.results = undefined;

      if (type === 'personnel') {
        this.searchQuery = {
          qualification: {},
          area: {},
          requiresExperienceWithPCR: false,
        };
        for (const qualification of this.personnelQualificationsKeys) {
          this.searchQuery.qualification[qualification as string] = true;
        }
        for (const area of this.personnelAreasKeys) {
          this.searchQuery.area[area as string] = true;
        }
      } else if (type === 'device') {
        this.searchQuery = {
          category: '',
        };
      } else if (type === 'consumable') {
        this.searchQuery = {
          category: '',
        };
      }
    }
  }


  setRequiresExperienceWithPCR(b: boolean) {
    this.searchQuery.requiresExperienceWithPCR = b;
  }


  isValid() {
    if (!this.postalCode) {
      return false;
    }
    if (this.searchType === 'personnel') {
      return true;
    } else if (this.searchType === 'device' || this.searchType === 'consumable') {
      return !!this.searchQuery.category;
    }
  }


  async onSubmit() {
    this.error = undefined;
    let data;
    let targetType;

    if (this.searchType === 'personnel') {
      targetType = 'manpower';
      data = {
        kilometer: this.DISTANCE_KILOMETER,
        qualification: [],
        area: [],
        experience_rt_pcr: this.searchQuery.requiresExperienceWithPCR,
        postalcode: this.postalCode,
        country: this.configurationService.countryName
      };

      for (const key in this.searchQuery.qualification) {
        if (this.searchQuery.qualification[key] === true) {
          data.qualification.push(key.toString());
        }
      }

      for (const key in this.searchQuery.area) {
        if (this.searchQuery.area[key] === true) {
          data.area.push(key.toString());
        }
      }

    } else if (this.searchType === 'device') {
      targetType = 'devices';
      data = {
        kilometer: this.DISTANCE_KILOMETER,
        category: this.searchQuery.category,
        postalcode: this.postalCode,
        country: this.configurationService.countryName
      };

    } else if (this.searchType === 'consumable') {
      targetType = 'consumables';
      data = {
        kilometer: this.DISTANCE_KILOMETER,
        category: this.searchQuery.category,
        postalcode: this.postalCode,
        country: this.configurationService.countryName
      };
    }

    const response = await this.fetchService.getOffers(targetType, data);
    if (response.error) {
      this.error = response.error;
      return;
    }
    const results = response.data;
    results.sort((res1, res2) => {
      return res1.resource.kilometer - res2.resource.kilometer;
    });
    this.results = results.map((r) => {
      const provider = r.provider ? providerFromApi(r.provider) : null;
      const distance = r.resource.kilometer;
      let resource;
      if (this.searchType === 'personnel') {
        resource = personnelFromApi(r.resource);
      } else if (this.searchType === 'device') {
        resource = deviceFromApi(r.resource);
      } else if (this.searchType === 'consumable') {
        resource = consumableFromApi(r.resource);
      }
      return {provider, resource, distance};
    });
  }


  isUnexpectedError(err) {
    if (!err?.message) {
      return false;
    }
    return typeof err.message === 'object';
  }
}
