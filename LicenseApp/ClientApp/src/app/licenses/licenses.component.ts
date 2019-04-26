import { MessageSate } from './../GlobalEnums';
import { ILicenseUserState, ILicenseUsers,ILicenseUserData } from './../Interfaces/IUserData';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesComponent } from "../messages/messages.component";
import { WebApiService } from '../web-api.service';
import { IdataObject } from '../Interfaces/IData-Object';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {

  isExpanded = true;
  isListExpanded = false;
  itemName = 'long name far far'
  licenseUsers : ILicenseUsers;
  licenseUsersFiltered : ILicenseUsers;
  filter : IdataObject = {};
  curentLicenseUserId : string = '';

  @ViewChild(MessagesComponent)
  messageComponent: MessagesComponent;


  constructor(private rout : ActivatedRoute, private ApiService : WebApiService ) {
    this.rout.data.subscribe(res => {
      this.licenseUsers = res.key;
      this.licenseUsersFiltered = res.key;
      this.curentLicenseUserId = this.licenseUsers.UserKeys[0];  
    });
   }

  ngOnInit() {
    
  }

  Expanded() {
    this.isExpanded = !this.isExpanded;
  }

  ListExpanded() {
    this.isListExpanded = !this.isListExpanded;
  }

  ApplyFilter() {
    
    let filterKeys : Array<string> = Object.keys(this.filter);
    this.licenseUsersFiltered = {UserKeys : [], UserState: {}};
    let licenseUsers : IdataObject = {};
    Object.assign(licenseUsers,this.licenseUsers);
    
    filterKeys.forEach(key => {
      let filterValue : string = this.filter[key];
        
        licenseUsers.UserKeys.forEach(userId => {
          if(filterValue) {
            let userValue : string = this.licenseUsers.UserState[userId].Contact[key]; 
            if  (userValue.search(filterValue) >= 0) {
              this.licenseUsersFiltered.UserKeys.push(userId);
              this.licenseUsersFiltered.UserState[userId] = this.licenseUsers.UserState[userId];       
            }
          } 
          else {
            this.licenseUsersFiltered.UserKeys.push(userId);
            this.licenseUsersFiltered.UserState[userId] = this.licenseUsers.UserState[userId];       
        }
        });
        Object.assign(licenseUsers , this.licenseUsersFiltered);
        this.licenseUsersFiltered = {UserKeys : [], UserState: {}};
    });
    Object.assign(this.licenseUsersFiltered,licenseUsers);
  }

  OnFilterChanged(event) {
    this.filter[event.filterName] = event.filterValue;
    this.ApplyFilter()
  }

  OnLicenseUserChanged(event) {
    this.curentLicenseUserId = event.id;
    this.licenseUsers.UserState[event.id] = event.LicenseUserData;
    if(!this.licenseUsers.UserKeys.indexOf(event.id)) {
      this.licenseUsers.UserKeys.push(event.id);
    }
    this.curentLicenseUserId = event.id;
    console.log('after emit', this.licenseUsers);
  } 

  OnLicenseUserMouseOwer(event) {
    this.curentLicenseUserId = event;
  } 

  OnLicenseUserMessage(event) {
    this.AddFormateMessage(event.messageStrind, event.MessageSate)
  }

  AddFormateMessage(message: string, imp: number) {
    this.messageComponent.AddMessage(new Date().toISOString() + ' ' + message, imp);
    setTimeout(() => {
      this.messageComponent.ClearMessages();
    }, 5000);
  }

  EmptyUserState() : ILicenseUserData  {
    return {
      Contact : {
        UserName      : '',
        Email         : '',
        PhoneNumber   : '',
        Organisation  : ''
      },
      Count : 0,
      Licenses : []
    };
    

  }

  Update() {
    this.ApiService.GetLiceseUsers().then(res => {
      this.licenseUsers = res;
      this.licenseUsersFiltered = res;  
    })

  }
  
  AddNewLicenseUser() {
    this.licenseUsers.UserKeys.push('empty')
    this.licenseUsers.UserState.empty = this.EmptyUserState();
    this.licenseUsersFiltered = this.licenseUsers;
  }

  

  Test() {
    this.ApiService.DownloadFile("hellow world","test.txt");
  }

}
