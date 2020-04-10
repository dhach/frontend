import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocaleService } from '../locale.service';


@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqPageComponent implements OnInit {

  locale: string;


  constructor(
    private localeService: LocaleService,
  ) {
    this.locale = localeService.locale;
  }


  ngOnInit(): void {
  }


  scrollTo(id) {
    document.getElementById(id).scrollIntoView();
  }
}
