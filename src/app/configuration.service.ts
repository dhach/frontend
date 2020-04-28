import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocaleService } from './locale.service';
import { AddressFormat, addressFormatFromApi } from './_types/AddressFormat';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  countryName: string;

  addressFormat: AddressFormat;

  languageConstants = {
    device: new Map<string, string>(),      // value -> language string
    consumable: new Map<string, string>(),  // value -> language string
    personnelArea: new Map<string, string>(),           // value -> language string
    personnelQualification: new Map<string, string>(),  // value -> language string
  };


  constructor(
    private apiService: ApiService,
    private localeService: LocaleService,
  ) {
  }


  async startup() {
    // Init LocaleService
    await this.localeService.init();

    // Fetch configurations
    const response = await this.apiService.getRegionConfiguration(this.localeService.region);
    if (response.error) {
      throw new Error('Application cannot start because the region configuration cannot be fetched.');
    }
    this.countryName = response.data.countryName;
    this.addressFormat = addressFormatFromApi(response.data.addressFormat, this.localeService.language);
    await this.prepareCategories(response.data);
  }


  private async prepareCategories(data) {
    // Get available categories
    const availableCategories = new Map<string, Array<string>>(); // Category type -> categories
                                                                  // Example: "device" -> ["PCR_THERMOCYCLER", ...]
    for (const categoryType in data.categories) {
      if (!data.categories.hasOwnProperty(categoryType)) {
        continue;
      }
      availableCategories.set(categoryType, data.categories[categoryType]);
    }

    // Get language strings of the categories
    let languageData = data.languages[this.localeService.language];
    if (!languageData) {
      languageData = data.languages.en; // Let English be the default language.
    }
    availableCategories.forEach((categories, categoryType) => {
      const constantsMap: Map<string, string> = this.languageConstants[categoryType];
      for (const category of categories) {
        constantsMap.set(category, languageData[categoryType][category]);
      }
    });
  }
}
