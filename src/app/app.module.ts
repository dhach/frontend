import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OfferSearchComponent } from './offer-search/offer-search.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AboutComponent } from './about/about.component';
import { OfferSearchResultListComponent } from './offer-search-result-list/offer-search-result-list.component';
import { OfferChangeComponent } from './offer-change/offer-change.component';
import { OfferFormResourceBlockComponent } from './offer-form-resource-block/offer-form-resource-block.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { OfferSearchContactFormComponent } from './offer-search-contact-form/offer-search-contact-form.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReCaptchaWrapperComponent } from './re-captcha-wrapper/re-captcha-wrapper.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RegionSubscriptionFormComponent } from './region-subscription-form/region-subscription-form.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDemandImportComponent } from './admin-demand-import/admin-demand-import.component';
import { ConfigurationService } from './configuration.service';
import { NeedSearchComponent } from './need-search/need-search.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatenschutzComponent,
    HeaderComponent,
    FooterComponent,
    OfferSearchComponent,
    OfferFormComponent,
    FaqPageComponent,
    ImpressumComponent,
    AboutComponent,
    OfferSearchResultListComponent,
    OfferChangeComponent,
    OfferFormResourceBlockComponent,
    OfferSearchContactFormComponent,
    ContactPageComponent,
    NotFoundComponent,
    ReCaptchaWrapperComponent,
    StatisticsComponent,
    RegionSubscriptionFormComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminDemandImportComponent,
    RegionSubscriptionFormComponent,
    NeedSearchComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ReactiveFormsModule,
    RecaptchaModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configurationService: ConfigurationService) => () => configurationService.startup(),
      deps: [ConfigurationService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
