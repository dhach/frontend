import { Component, Input, OnChanges, OnInit, Provider, SimpleChanges } from '@angular/core';
import { Personnel } from '../_types/Personnel';
import { Device } from '../_types/Device';
import { Consumable } from '../_types/Consumable';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-offer-search-result-list',
  templateUrl: './offer-search-result-list.component.html',
  styleUrls: ['./offer-search-result-list.component.scss']
})
export class OfferSearchResultListComponent implements OnInit, OnChanges {

  personnelQualifications: Map<string, string>;
  personnelAreas: Map<string, string>;


  @Input() type: string;
  @Input() searchResults: Array<{
    provider?: Provider,
    resource: Personnel | Device | Consumable,
    distance: number,
  }>;

  showDetails: Array<boolean>;


  constructor(
    private configurationService: ConfigurationService,
  ) {
    this.personnelAreas = configurationService.languageConstants.personnelArea;
    this.personnelQualifications = configurationService.languageConstants.personnelQualification;
  }


  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchResults) {
      this.showDetails = [];
      for (const _ of this.searchResults) {
        this.showDetails.push(false);
      }
    }
  }


  toggleShowDetails(i) {
    this.showDetails[i] = !this.showDetails[i];
  }


  formatAddress(address): string {
    const streetLine = `${address.street ?? ''} ${address.streetNumber ?? ''}`.trim() + '\n';
    const cityLine = `${address.postalCode ?? ''} ${address.city ?? ''}`.trim().concat('\n');
    const countryLine = `${address.country && (address.country !== 'Deutschland') ? address.country : ''}`;
    return (streetLine + cityLine + countryLine).trim();
  }
}
