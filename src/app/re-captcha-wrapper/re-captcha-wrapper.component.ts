import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-re-captcha-wrapper',
  templateUrl: './re-captcha-wrapper.component.html',
  styleUrls: ['./re-captcha-wrapper.component.scss']
})
export class ReCaptchaWrapperComponent implements OnInit {

  @Output() resolved: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(RecaptchaComponent) reCaptchaElement: RecaptchaComponent;

  siteKey = environment.reCaptchaSiteKey;


  constructor() {
  }


  ngOnInit(): void {
  }


  onResolved(reCaptchaResponse: string) {
    this.resolved.emit(reCaptchaResponse);
  }


  reset() {
    this.reCaptchaElement.reset();
  }
}
