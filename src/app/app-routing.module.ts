import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferSearchComponent } from './offer-search/offer-search.component';
import { NeedSearchComponent } from './need-search/need-search.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { AboutComponent } from './about/about.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { OfferChangeComponent } from './offer-change/offer-change.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDemandImportComponent } from './admin-demand-import/admin-demand-import.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'angebote/neu', component: OfferFormComponent },
  { path: 'suchanfrage', component: OfferSearchComponent },

  // There is currently no link to this module since it is not ready yet, and there are no demand resources in the
  // database yet.
  { path: 'demands', component: NeedSearchComponent },

  { path: 'contact', component: ContactPageComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'change/:key', component: OfferChangeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/demand-import', component: AdminDemandImportComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
