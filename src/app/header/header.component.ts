import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LocaleService } from '../locale.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  url;


  constructor(
    private router: Router,
    public localeService: LocaleService,
  ) {
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


  changeRegionOrLang($event: Event) {
    window.location.href = ($event.target as any).value;
  }
}
