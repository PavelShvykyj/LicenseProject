
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ILicenseUserData, ILicenseUsers, ILicense } from '../Interfaces/IUserData';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.css']
})
export class LicenseInfoComponent implements OnInit {

  form: FormGroup;
  LicenseId: number;
  LicenseUserState: ILicenseUsers
  Licenses: Array<ILicense>;

  constructor(private rout: ActivatedRoute) {
    this.form = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl(),
      Expired: new FormControl(),
      Quontity: new FormControl(),
      DemoMode: new FormControl(),
      DataLifeDurationInDemo: new FormControl(),
      UserId: new FormControl()
    });

    combineLatest(rout.data, rout.params).subscribe(
      params => {
        this.LicenseUserState = params[0].key;
        this.LicenseId = params[1].licenseId;
        this.Licenses = this.LicenseUserState.UserState[this.LicenseUserState.UserKeys[0]].Licenses;

        if (this.Licenses.length != 0) {
          this.UploadForm(this.Licenses[0]);
        }
        else {
          this.ClearForm();
        }
      });
  }

  ngOnInit() {
    console.log(this.form);
  }


  ////  ************************  GET SET FORM VALUES *********************
  private get Id() { return this.form.get("Id") }
  private get Name() { return this.form.get("Name") }
  private get Expired() { return this.form.get("Expired") }
  private get Quontity() { return this.form.get("Quontity") }
  private get DemoMode() { return this.form.get("DemoMode") }
  private get DataLifeDurationInDemo() { return this.form.get("DataLifeDurationInDemo") }
  private get UserId() { return this.form.get("UserId") }

  private get Id_() { return this.Id.value }
  private get Name_() { return this.Name.value }
  private get Expired_() { return this.Expired.value }
  private get Quontity_() { return this.Quontity.value }
  private get DemoMode_() { return this.DemoMode.value }
  private get DataLifeDurationInDemo_() { return this.DataLifeDurationInDemo.value }
  private get UserId_() { return this.UserId.value }

  private set Id_(value) { this.Id.patchValue(value) }
  private set Name_(value) { this.Name.patchValue(value) }
  private set Expired_(value) { this.Expired.patchValue(value) }
  private set Quontity_(value) { this.Quontity.patchValue(value) }
  private set DemoMode_(value) { this.DemoMode.patchValue(value) }
  private set DataLifeDurationInDemo_(value) { this.DataLifeDurationInDemo.patchValue(value) }
  private set UserId_(value) { this.UserId.patchValue(value) }

  UploadForm(LicenseData: ILicense) {
    this.Id_ = LicenseData.Id;
    this.UserId_ = this.LicenseUserState.UserKeys[0];
    this.Name_ = LicenseData.Name;
    this.Expired_ = LicenseData.Expired;
    this.Quontity_ = LicenseData.Quontity;
    this.DemoMode_ = LicenseData.DemoMode;
    this.DataLifeDurationInDemo_ = LicenseData.DataLifeDurationInDemo;
  }

  ClearForm() {
    this.Id_ = 0;
    this.Name_ = "";
    this.Expired_ = new Date();
    this.Quontity_ = 0;
    this.DemoMode_ = false;
    this.DataLifeDurationInDemo_ = 0;
  }

}
