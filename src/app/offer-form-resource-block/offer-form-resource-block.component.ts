import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Consumable } from '../_types/Consumable';
import { Device } from '../_types/Device';
import { Personnel } from '../_types/Personnel';
import { LocaleService } from '../locale.service';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-offer-form-resource-block',
  templateUrl: './offer-form-resource-block.component.html',
  styleUrls: ['./offer-form-resource-block.component.scss']
})
export class OfferFormResourceBlockComponent implements OnInit {

  deviceCategories: Map<string, string>;
  consumableCategories: Map<string, string>;
  deviceCategoriesKeys: Array<string>;
  consumableCategoriesKeys: Array<string>;
  personnelQualifications: Map<string, string>;
  personnelAreas: Map<string, string>;
  personnelQualificationsKeys: Array<string>;
  personnelAreasKeys: Array<string>;

  @Input('resource') r: { type: string, resource: Consumable | Device | Personnel, checkedEhrenamt?: boolean };
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private configurationService: ConfigurationService,
  ) {
    this.deviceCategories = configurationService.languageConstants.device;
    this.consumableCategories = configurationService.languageConstants.consumable;
    this.deviceCategoriesKeys = Array.from(this.deviceCategories.keys());
    this.consumableCategoriesKeys = Array.from(this.consumableCategories.keys());

    this.personnelAreas = configurationService.languageConstants.personnelArea;
    this.personnelQualifications = configurationService.languageConstants.personnelQualification;
    this.personnelAreasKeys = Array.from(this.personnelAreas.keys());
    this.personnelQualificationsKeys = Array.from(this.personnelQualifications.keys());
  }


  ngOnInit(): void {
  }


  getEnumValues(enumElement) {
    return Object.values(enumElement);
  }


  deleteItem() {
    this.delete.emit();
  }


  toP(r: { type: string; resource: Consumable | Device | Personnel; checkedEhrenamt?: boolean }): Personnel {
    return r.resource as Personnel;
  }

  toC(r: { type: string; resource: Consumable | Device | Personnel; checkedEhrenamt?: boolean }): Consumable {
    return r.resource as Consumable;
  }


  toD(r: { type: string; resource: Consumable | Device | Personnel; checkedEhrenamt?: boolean }): Device {
    return r.resource as Device;
  }
}
