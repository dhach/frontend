import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { environment } from '../../environments/environment';
import { LocaleService } from '../locale.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  url;

  currentRegionLangOption;
  regionLangOptions = [
    { icon: 'de.png', href: '/de/de/', label: 'Deutschland - Deutsch' },
    { icon: 'de.png', href: '/de/en/', label: 'Germany - English' },
    { icon: 'at.png', href: '/at/de/', label: 'Österreich - Deutsch' },
    { icon: 'at.png', href: '/at/en/', label: 'Austria - English' },
    { icon: 'it.png', href: '/it/it/', label: 'Italia - Italiano' },
    { icon: 'it.png', href: '/it/en/', label: 'Italy - English' },
    { icon: 'my.png', href: '/my/en/', label: 'Malaysia - English' },
  ];


  constructor(
    private router: Router,
    public localeService: LocaleService,
  ) {
    this.currentRegionLangOption = this.regionLangOptions.find(({ href }) =>
      href === localeService.baseHref);
  }


  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }


  isProduction() {
    return environment.environment === 'production';
  }


  changeRegionOrLang(href) {
    window.location.href = href + this.url;
  }


  onShown() {

  }


  onHidden() {

  }


  isOpenChange() {

  }
}
