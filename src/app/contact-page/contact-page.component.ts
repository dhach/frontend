import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LocaleService } from '../locale.service';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  requestData = {
    name: '',
    phone: '',
    email: '',
    topic: '',
    notes: ''
  };

  recaptcha: string;

  checkedDatenschutz: boolean;

  callBackSubmit = false;


  constructor(
    public localeService: LocaleService,
    private fetchService: ApiService,
  ) {
  }


  ngOnInit(): void {
  }


  resolved(captchaResponse) {
    this.recaptcha = captchaResponse;
  }


  isValid() {
    return this.requestData.name && this.requestData.phone && this.requestData.topic && this.checkedDatenschutz;
  }


  onSubmit() {
    this.sendRequest();
    this.callBackSubmit = true;
    this.requestData = {
      name: '',
      phone: '',
      email: '',
      topic: '',
      notes: ''
    };
  }


  async sendRequest() {
    if (!this.isValid()) {
      return;
    }
    const response = await this.fetchService.requestCall(this.requestData, this.recaptcha);
    if (response.error) {
      throw new Error('Unexpected / unhandled error');
    }
  }

}
