import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  region: string;
  language: string;


  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
  ) {
    if (baseHref === '/' && !environment.production) {
      this.region = 'de';
      this.language = 'en';
      this.baseHref = '/de/en/';
    } else {
      const [region, language] = baseHref.substring(1, baseHref.length - 1).split('/');
      this.region = region;
      this.language = language;
    }
  }
}
