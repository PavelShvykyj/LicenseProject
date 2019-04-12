import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ILicenseUserData } from '../Interfaces/IUserData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebApiService } from '../web-api.service';
import { PasswordValid, UniqnessUserName, UniqnessPhone, UniqnessEmail } from '../validators/account-validators';


@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit, AfterViewInit {


  @Input('LicenseUserData') User : ILicenseUserData;
  @Input('LicenseUserID') UserId : string;
  @Output('LicenseUserChangedEmitter') LicenseUserChangedEmitter = new EventEmitter() ;
  form: FormGroup;
  inDisabledState: boolean = true;
  isDeleted: boolean = false;


  constructor(private WebApi: WebApiService) { }

  ngOnInit() {
    console.log(this.User);
    this.form = new FormGroup({
      Id: new FormControl(this.UserId),
      Email: new FormControl(this.User.Contact.Email, Validators.required, UniqnessEmail(this.WebApi)),
      UserName: new FormControl(this.User.Contact.UserName, Validators.required, UniqnessUserName(this.WebApi)),
      PhoneNumber: new FormControl(this.User.Contact.PhoneNumber, Validators.required, UniqnessPhone(this.WebApi)),
      Organization: new FormControl(this.User.Contact.Organisation, Validators.required ),
      Password: new FormControl("",PasswordValid)
    });

  }


  ngAfterViewInit() {
    setTimeout(() => {
    if(this.UserId == "" || this.UserId == "empty") {
      this.SwichDisableState();
    }
    }, 20); 
  } 

  get Password() {
    return this.form.get("Password");
  }

  get Email() {
    return this.form.get("Email");
  }

  get UserName() {
    return this.form.get("UserName");
  }

  get PhoneNumber() {
    return this.form.get("PhoneNumber");
  }

  get Id() {
    return this.form.get("Id");
  }

  get Organization() {
    return this.form.get("Organization");
  }


  UploadUserToForm() {
    setTimeout(() => {
      this.Id.patchValue(this.UserId);
      this.Email.patchValue(this.User.Contact.Email);
      this.UserName.patchValue(this.User.Contact.UserName);
      this.PhoneNumber.patchValue(this.User.Contact.PhoneNumber);
      this.Organization.patchValue(this.User.Contact.Organisation);
      
    }, 10);
  }

  UploadFormToUser() {
    setTimeout(() => {
      this.UserId = this.Id.value;
      this.User.Contact.Email = this.Email.value;
      this.User.Contact.UserName = this.UserName.value;
      this.User.Contact.PhoneNumber = this.PhoneNumber.value;
      this.User.Contact.Organisation = this.Organization.value;
    }, 10);
  }

  SwichDisableState() {
    this.inDisabledState = !this.inDisabledState;
    
  }

  ChangeOrUndo() {
    if (!this.inDisabledState) {
      this.UploadUserToForm();
      this.isDeleted = false;
    }

    this.SwichDisableState();
  }


}
