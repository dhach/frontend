import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import * as parser from 'fast-xml-parser';


@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  region: string;
  language: string;

  itemLabels: {
    en: Map<string, string>,
    currentLanguage: Map<string, string>;
  };


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


  async init() {
    let req = await fetch('/i18n/item-labels/messages.en.xlf');
    this.itemLabels = {
      en: this.processXliff(await req.text()),
      currentLanguage: undefined,
    };
    if (this.language !== 'en') {
      req = await fetch(`/i18n/item-labels/messages.${this.language}.xlf`);
      if (req.status < 400) {
        this.itemLabels.currentLanguage = this.processXliff(await req.text());
        return;
      }
    }
    this.itemLabels.currentLanguage = this.itemLabels.en;
  }


  processXliff(xliff: string): Map<string, string> {
    const xliffJson = parser.parse(xliff, {
      ignoreAttributes: false,
    });
    const translations = new Map<string, string>();
    for (const transUnit of xliffJson.xliff.file.body['trans-unit']) {
      const id = transUnit['@_id'];
      let target = transUnit.target;
      if (typeof target !== 'string') {
        if (target.state === 'new') {
          continue;
        }
        target = transUnit.target['#text'];
      }
      if (!target || target.trim().length === 0) {
        continue;
      }
      translations.set(id, target);
    }
    return translations;
  }
}
