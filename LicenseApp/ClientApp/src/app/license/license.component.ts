import { MessageSate } from './../GlobalEnums';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ILicenseUserData, ISignInResource } from '../Interfaces/IUserData';
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
  @Output('LicenseUserMessageEmitter') LicenseUserMessageEmitter = new EventEmitter() ;
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
      Organisation: new FormControl(this.User.Contact.Organisation, Validators.required ),
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

  get Organisation() {
    return this.form.get("Organisation");
  }


  UploadUserToForm() {
    setTimeout(() => {
      this.Id.patchValue(this.UserId);
      this.Email.patchValue(this.User.Contact.Email);
      this.UserName.patchValue(this.User.Contact.UserName);
      this.PhoneNumber.patchValue(this.User.Contact.PhoneNumber);
      this.Organisation.patchValue(this.User.Contact.Organisation);
      
    }, 10);
  }

  UploadFormToUser() {
    setTimeout(() => {
      this.UserId = this.Id.value;
      this.User.Contact.Email = this.Email.value;
      this.User.Contact.UserName = this.UserName.value;
      this.User.Contact.PhoneNumber = this.PhoneNumber.value;
      this.User.Contact.Organisation = this.Organisation.value;
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

  formValid() : boolean {
    let passwordValid : boolean = this.Password.valid || this.Id.value != "" || this.Id.value != "empty";
    let formValid : boolean = this.Email.valid && this.PhoneNumber.valid && this.UserName.valid && passwordValid;
    return formValid;
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
      let timeout =   2000;
      if(IsError) {timeout = 10000};
    
      
      ($('#'+this.UserId) as any).popover(options);
      ($('#'+this.UserId) as any).popover('show');
      setTimeout(() => {
        this.HidePopMessage();
      }, timeout);
    }, 20);

  }

  HidePopMessage() {
    ($('#'+this.UserId) as any).popover('dispose');
    ($('.popover') as any).remove();
  }


  AddFormateMessage(message: string, imp: number) {
    let eventData = {messageStrind : message, MessageSate : imp}
    this.LicenseUserMessageEmitter.emit(eventData);
    this.ShowPopMessage(message,imp == MessageSate.Error);
  }

  async SaveChanges() {
    if (!this.formValid())   {
      this.AddFormateMessage('Не верное заполнение формы',MessageSate.Error);
      return;
    }

    let UserData: ISignInResource = {
      Id: this.Id.value,
      Contact: {Organisation : this.Organisation.value ,  Email: this.Email.value, UserName: this.UserName.value, PhoneNumber: this.PhoneNumber.value },
      Password : this.Password.value,
      Roles: []
    };

    if (!this.Id.value || this.Id.value == "" || this.Id.value == "empty") { //// создаем нового
      await this.WebApi.SigninLicense(UserData)
        .then(result => {
          //// тоггл Ok
          let requestdata : ISignInResource = JSON.parse(result);
          this.Id.patchValue(requestdata.Id);          
          this.Password.patchValue('');          
          this.UploadFormToUser();
          this.User.Licenses = [];
          this.User.Count = 0;
          this.isDeleted = false;
          
          this.SwichDisableState();
          this.AddFormateMessage('Changes saved',MessageSate.Sucsess);
          
        })
        .catch(error => {
          //// тоггл error
          this.AddFormateMessage('не создали пользователя '+JSON.stringify(error.error),MessageSate.Error);
        });
    } else {
      await this.WebApi.UpdateLicenseUser(UserData)
        .then(result => {
          //// тоггл Ok
          this.Password.patchValue(''); 
          this.UploadFormToUser();
          this.SwichDisableState();
          this.AddFormateMessage('Changes saved',MessageSate.Sucsess);
        })
        .catch(error => {
          //// тоггл error
          this.AddFormateMessage('не обновили пользователя '+JSON.stringify(error.error),MessageSate.Error);
        });
    }
  }

  async MarkDeleted() {
    if (this.UserId == "empty" || this.UserId == "") {
      return
    }  
    
    if (this.isDeleted) {
        await this.WebApi.DeleteUser(this.UserId)
        .then(result => {
          //// обнуляем ИД но данные в памяти сохраняем дабы иметь возможность нажать сохранить если передумали
          this.Id.patchValue("");
          this.UserId = "";  
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

  ///// Вызывается из директив (@output) изменяющих значение: прописываем занчение DOM елемента в контрол формы и вызываем валидацию его
  OnDirectiveChange(event) {
    this[event.name].patchValue(event.value);
    this[event.name].updateValueAndValidity({ onlySelf: true });
  }    

  Onmouseover() {
    this.LicenseUserChangedEmitter.emit(this.UserId);
  }
  
  


}
