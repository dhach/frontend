import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  region: string;
  language: string;


  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
  ) {
    const [region, language] = baseHref.substring(1, baseHref.length - 1).split('/');
    this.region = region;
    this.language = language;
  }
}
