import { Component, OnInit } from '@angular/core';
import { LocaleService } from '../locale.service';


@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss']
})
export class DatenschutzComponent implements OnInit {

  constructor(public localeService: LocaleService) {
  }


  ngOnInit(): void {
  }

}
