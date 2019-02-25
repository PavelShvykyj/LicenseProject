import { WebApiService } from './../web-api.service';
import { UniqnessUserName, UniqnessEmail, UniqnessPhone  } from './../validators/account-validators';
import { FormGroup, FormControl, Validators } from '@angular/Forms';
import { Component, OnInit, Input } from '@angular/core';
import { ISignInResource } from '../Interfaces/IUserData';

 


@Component({
  selector: 'app-co-woker',
  templateUrl: './co-woker.component.html',
  styleUrls: ['./co-woker.component.css']
})
export class CoWokerComponent implements OnInit {

  @Input("User") User : ISignInResource;
  form : FormGroup;
  inDisabledState : boolean = true;
  inDisabledStateRoles : boolean = true;
  isDeleted : boolean = false;
  
  constructor(private  WebApi : WebApiService) {
   }

  ngOnInit() {
    this.form =   new FormGroup({Id : new FormControl(),
      Email : new FormControl('',Validators.required,UniqnessEmail(this.WebApi)),
      UserName : new FormControl('',Validators.required,UniqnessUserName(this.WebApi)),
      PhoneNumber : new FormControl('',Validators.required,UniqnessPhone(this.WebApi))});
    
    
      this.UploadUserToForm();
  }

  get Email () {
    return this.form.get("Email");
  }

  get UserName () {
    return this.form.get("UserName");
  }

  get PhoneNumber () {
    return this.form.get("PhoneNumber");
  }

  get Id () {
    return this.form.get("Id");
  }

  SwichDisableState() {
    this.inDisabledState = !this.inDisabledState;
    if (this.inDisabledState) {
      this.inDisabledStateRoles = true;
    } else {
      this.inDisabledStateRoles = false;
    }

  }
 
  SwichDisableStateRoles() {
    this.inDisabledStateRoles = !this.inDisabledStateRoles;
  }

  ChangeOrUndo() {
    if (!this.inDisabledState) {
      this.UploadUserToForm();
      this.isDeleted = false;
    }
    
    this.SwichDisableState();
  }

  MarkDeleted() {
    this.isDeleted = true;
  }
  
  SaveCanges() {
    /// серверные вызовы пропишем вторым этапом когда форму отладим
    this.UploadFormToUser();
    this.SwichDisableState();
  }

  UploadUserToForm() {
    
    this.Id.patchValue(this.User.Id);
    this.Email.patchValue(this.User.SignIn.Email);
    this.UserName.patchValue(this.User.SignIn.UserName);
    this.PhoneNumber.patchValue(this.User.SignIn.PhoneNumber);
  }

  UploadFormToUser() {
    this.User.Id = this.Id.value;
    this.User.SignIn.Email = this.Email.value;
    this.User.SignIn.UserName = this.UserName.value;
    this.User.SignIn.PhoneNumber = this.PhoneNumber.value;
  }

  SaveRoleChanges(Roles : Array<string>) {
    this.User.Roles = Roles;
  }

  OnSaveRoleChanges(event) {
    this.SaveRoleChanges(event);  
  }


  ///// Вызывается из директив (@output) изменяющих значение: прописываем занчение DOM елемента в контрол формы и вызываем валидацию его
  OnDirectiveChange(event) {
    this[event.name].patchValue(event.value); 
    this[event.name].updateValueAndValidity( {onlySelf : true} );
  }
 
}
