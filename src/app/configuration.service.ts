import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocaleService } from './locale.service';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

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
    const response = await this.apiService.getRegionConfiguration(this.localeService.region);
    if (response.error) {
      throw new Error('Application cannot start because the region configuration cannot be fetched.');
    }
    await this.prepareCategories(response.data);
  }


  private async prepareCategories(data) {
    let languageData = data.languages[this.localeService.language];
    if (!languageData) {
      languageData = data.languages.en; // Let English be the default language.
    }
    for (const constantsType in languageData) {
      if (!languageData.hasOwnProperty(constantsType)) {
        continue;
      }
      const constants = languageData[constantsType];
      for (const constantInternalValue in constants) {
        if (!constants.hasOwnProperty(constantInternalValue)) {
          continue;
        }
        const constantLanguageString = constants[constantInternalValue];
        this.languageConstants[constantsType].set(constantInternalValue, constantLanguageString);
      }
    }
  }
}
