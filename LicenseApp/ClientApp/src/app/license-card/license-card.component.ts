import { Component, OnInit, Input } from '@angular/core';
import { ILicense, IContact } from '../Interfaces/IUserData';

@Component({
  selector: 'license-card',
  templateUrl: './license-card.component.html',
  styleUrls: ['./license-card.component.css']
})
export class LicenseCardComponent implements OnInit {

  @Input('LicenseInfo') LicenseInfo : ILicense;
  @Input('LicenseUserInfo') LicenseUserInfo : IContact;

  constructor() { }

  ngOnInit() {
  }

}
