import { ILicenseUserState, ILicenseUsers } from './../Interfaces/IUserData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private rout : ActivatedRoute ) {
    this.rout.data.subscribe(res => {
      this.licenseUsers = res.key;
      this.licenseUsersFiltered = res.key;  
    });
   }

  ngOnInit() {
  }

  Expanded() {
    this.isExpanded = !this.isExpanded;
    this.itemName = this.isExpanded ? 'long name far far' : 'SHT';

   

  }

  ListExpanded() {
    this.isListExpanded = !this.isListExpanded;


  }


  OnFilterChanged(event) {
    console.log('filter event',event);

  }


}
