import { error } from 'util';
import { WebApiService } from './../web-api.service';
import { UniqnessUserName, UniqnessEmail, UniqnessPhone, PasswordValid } from './../validators/account-validators';
import { FormGroup, FormControl, Validators } from '@angular/Forms';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ISignInResource } from '../Interfaces/IUserData';
import 'jquery';
import 'bootstrap';
import * as $ from 'jquery';



@Component({
  selector: 'app-co-woker',
  templateUrl: './co-woker.component.html',
  styleUrls: ['./co-woker.component.css']
})
export class CoWokerComponent implements OnInit, AfterViewInit {

  @Input("User") User: ISignInResource;
  form: FormGroup;
  inDisabledState: boolean = true;
  inDisabledStateRoles: boolean = true;
  isDeleted: boolean = false;
  

  constructor(private WebApi: WebApiService) {
    
    
  }

  ngOnInit() {
    this.form = new FormGroup({
      Id: new FormControl(this.User.Id),
      Email: new FormControl(this.User.Contact.Email, Validators.required, UniqnessEmail(this.WebApi)),
      UserName: new FormControl(this.User.Contact.UserName, Validators.required, UniqnessUserName(this.WebApi)),
      PhoneNumber: new FormControl(this.User.Contact.PhoneNumber, Validators.required, UniqnessPhone(this.WebApi)),
      Password: new FormControl("",PasswordValid)
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
    if(this.User.Id == "" || this.User.Id == "empty") {
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

  ShowPopMessage(Message : string , IsError : boolean) {
    setTimeout(() => {
      let title : string = "";
      if(IsError) {title = "ERROR"} else {title = "Ok"};
      let options = {
        container : 'body',
        content : Message,
        placement : 'top',
        title : title, 
        trigger : 'manual'
      };
      let timeout = 2000;
      if(IsError) {timeout = 10000};
    

      ($('#'+this.User.Id) as any).popover(options);
      ($('#'+this.User.Id) as any).popover('show');
      setTimeout(() => {
        this.HidePopMessage();
      }, timeout);
    }, 20);

  }

  HidePopMessage() {
    ($('#'+this.User.Id) as any).popover('dispose');
    ($('.popover') as any).remove();
    
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

 async MarkDeleted() {
  if (this.User.Id == "empty" || this.User.Id == "") {
    return
  }  
  
  if (this.isDeleted) {
      await this.WebApi.DeleteUser(this.User.Id)
      .then(result => {
        //// обнуляем ИД но данные в памяти сохраняем дабы иметь возможность нажать сохранить если передумали
        this.Id.patchValue("");
        this.User.Id = "";  
        this.SwichDisableState();
        this.ShowPopMessage("Changes saved",false);
      })
      .catch(error => {
        this.isDeleted = false;
        this.ShowPopMessage('не обновили пользователя '+JSON.stringify(error.error),true)
      
      })
    } 
    else {
      this.isDeleted = true;
    }
  }

  formValid() : boolean {
    let passwordValid : boolean = this.Password.valid || this.Id.value != "" || this.Id.value != "empty";
    let formValid : boolean = this.Email.valid && this.PhoneNumber.valid && this.UserName.valid && passwordValid;
    return formValid;
  }

  async SaveChanges() {

   
 
    if (!this.formValid())   {
      this.ShowPopMessage('Не верное заполнение формы',true)
      return;
    }

    let UserData: ISignInResource = {
      Id: this.Id.value,
      Contact: { Email: this.Email.value, UserName: this.UserName.value, PhoneNumber: this.PhoneNumber.value },
      Password : this.Password.value,
      Roles: []
    };

    if (!this.Id.value || this.Id.value == "" || this.Id.value == "empty") { //// создаем нового
      await this.WebApi.Signin(UserData)
        .then(result => {
          //// тоггл Ok
          let requestdata : ISignInResource = JSON.parse(result);
          this.Id.patchValue(requestdata.Id);          
          this.Password.patchValue('');          
          this.UploadFormToUser();
          this.User.Roles = requestdata.Roles;
          this.isDeleted = false;
          
          this.SwichDisableState();
          this.ShowPopMessage("Changes saved",false);
        })
        .catch(error => {
          //// тоггл error
          this.ShowPopMessage('не создали пользователя '+JSON.stringify(error.error),true);
          console.log('не создали пользователя ', error.error);
        });
    } else {
      await this.WebApi.UpdateUser(UserData)
        .then(result => {
          //// тоггл Ok
          this.Password.patchValue(''); 
          this.UploadFormToUser();
          this.SwichDisableState();
          this.ShowPopMessage("Changes saved",false);
        })
        .catch(error => {
          //// тоггл error
          this.ShowPopMessage('не обновили пользователя '+JSON.stringify(error.error),true);
          console.log('не обновили пользователя ', error.error);
        });
    }
  }

  UploadUserToForm() {
    setTimeout(() => {
      this.Id.patchValue(this.User.Id);
      this.Email.patchValue(this.User.Contact.Email);
      this.UserName.patchValue(this.User.Contact.UserName);
      this.PhoneNumber.patchValue(this.User.Contact.PhoneNumber);
      
    }, 10);
  }

  UploadFormToUser() {
    setTimeout(() => {
      this.User.Id = this.Id.value;
      this.User.Contact.Email = this.Email.value;
      this.User.Contact.UserName = this.UserName.value;
      this.User.Contact.PhoneNumber = this.PhoneNumber.value;
    }, 10);
  }

  async SaveRoleChanges(Roles: Array<string>) {
    if (!this.formValid()) {
      return;
    }

    if (!this.Id) {
      return; //// empty user
    }

    await this.WebApi.UpdateUserRoles(this.Id.value, Roles)
      .then(result => {
        this.User.Roles = Roles;
        this.ShowPopMessage("Changes saved",false)
      })
      .catch(error => {
        //// тоггл error
        this.ShowPopMessage('не обновили роли '+JSON.stringify(error.error),true);
        console.log('не обновили роли ', error.error);
      });
  }

  OnSaveRoleChanges(event) {
    this.SaveRoleChanges(event);
  }

  ///// Вызывается из директив (@output) изменяющих значение: прописываем занчение DOM елемента в контрол формы и вызываем валидацию его
  OnDirectiveChange(event) {
    this[event.name].patchValue(event.value);
    this[event.name].updateValueAndValidity({ onlySelf: true });
  }

}
