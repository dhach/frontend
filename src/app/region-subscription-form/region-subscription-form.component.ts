import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ReCaptchaWrapperComponent } from '../re-captcha-wrapper/re-captcha-wrapper.component';
import { ApiResponseError } from '../_types/ApiResponseError';


@Component({
  selector: 'app-region-subscription-form',
  templateUrl: './region-subscription-form.component.html',
  styleUrls: ['./region-subscription-form.component.scss']
})
export class RegionSubscriptionFormComponent implements OnInit {

  @ViewChild(ReCaptchaWrapperComponent) reCaptchaComponent: ReCaptchaWrapperComponent;

  data = {
    name: undefined,
    institution: undefined,
    email: undefined,
    postalCode: undefined
  };

  checkedDatenschutz = false;

  recaptcha: string;

  submitted = false;

  error: ApiResponseError;


  constructor(
    private fetchService: ApiService,
  ) {
  }


  ngOnInit(): void {
  }


  isValid(): boolean {
    return !!(this.data.name && this.data.institution && this.data.email && this.data.postalCode
      && this.checkedDatenschutz);
  }


  resolved(captchaResponse) {
    this.recaptcha = captchaResponse;
  }


  async onSubmit() {
    if (!this.isValid()) {
      return;
    }
    const response = await this.fetchService.subscribeRegion({
      email: this.data.email,
      name: this.data.name,
      institution: this.data.institution,
      postalcode: this.data.postalCode
    }, this.recaptcha);
    if (response.error) {
      this.reCaptchaComponent.reset();
      this.error = response.error;
      return;
    }
    this.submitted = true;
    this.error = undefined;
  }
}
