import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ResourceContactMessage } from '../_types/ResourceContactMessage';


@Component({
  selector: 'app-offer-search-contact-form',
  templateUrl: './offer-search-contact-form.component.html',
  styleUrls: ['./offer-search-contact-form.component.scss']
})
export class OfferSearchContactFormComponent implements OnInit {

  @Input() requestType: string; // Allowed values are "resources" and "demands"
  @Input() resourceType: string;
  @Input() resourceId: number;

  message: ResourceContactMessage = {
    senderName: '',
    senderInstitution: '',
    senderEmail: '',
    senderPhone: '',
    message: '',
  };
  recaptcha: string;

  messageSent = false;


  constructor(
    private fetchService: ApiService,
  ) {
  }


  ngOnInit(): void {
  }


  captchaResolved(recaptcha) {
    this.recaptcha = recaptcha;
  }


  async onSubmit() {
    if (!this.isValid()) {
      return;
    }
    const response = await this.fetchService.sendResourceOrDemandContactMessage(this.requestType, this.resourceType,
      this.resourceId, this.message, this.recaptcha);
    if (response.error) {
      throw new Error('Unexpected / unhandled error');
    }
    this.messageSent = true;
  }


  isValid() {
    return this.message.senderName && this.message.senderInstitution && this.message.senderEmail
      && this.message.message;
  }
}
