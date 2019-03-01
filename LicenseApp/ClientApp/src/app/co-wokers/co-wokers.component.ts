import { element } from 'protractor';
import { WebApiService } from './../web-api.service';
import { Component, OnInit } from '@angular/core';
import { ISignInResource } from '../Interfaces/IUserData';
import { UserRoles } from '../GlobalEnums';

@Component({
  selector: 'app-co-wokers',
  templateUrl: './co-wokers.component.html',
  styleUrls: ['./co-wokers.component.css']
})
export class CoWokersComponent implements OnInit {

  Users : Array<ISignInResource> = [];
  isUpdating : boolean = false;
   

  constructor(private ApiService : WebApiService ) { }

  async Update() {
    
    this.isUpdating = true;
    await this.ApiService.GetUsers()
      .then(result => {
        // let bUsers = JSON.parse(result);
        // console.log(bUsers);
        // bUsers.forEach(element => {
        //   let User: ISignInResource = this.GetFakeUser(element.id);
        //   User.Roles = element.roles;
        //   User.SignIn.Email = element.signIn.email;
        //   User.SignIn.UserName = element.signIn.userName;
        //   User.SignIn.PhoneNumber = element.signIn.phoneNumber;
        //   this.Users.push(User);
        // });
        this.Users = JSON.parse(result);
      })
      .catch(error => {console.log('get users error ',error)});
      this.isUpdating = false;
  }


  NewUser() {
    this.Users.push(this.GetEmptyUser());
  }

  GetEmptyUser() : ISignInResource  {

    let emptyUser : ISignInResource = {
      Id : 'empty',
      SignIn : {
        UserName : "",
        Email : "",
        PhoneNumber : ""
      },
      Roles : []
   } 
   return emptyUser;
  }  

  GetFakeUser(id) : ISignInResource  {

    let fakeUser : ISignInResource = {
      Id : id,
      SignIn : {
        UserName : "Fake",
        Email : "Fake@Fake",
        PhoneNumber : "+380509999999"
      },
      Roles : [UserRoles[UserRoles.Administrator]]
   } 
   return fakeUser;
  }

  ngOnInit() {
     this.Update()

    //this.Users.push(this.GetFakeUser('78d10a02-6025-46a5-88f8-081fdb607966'));
    //this.Users.push(this.GetFakeUser('78d10a02-6025-46a5-88f8-081fdb607967'));
    //this.Users.push(this.GetFakeUser('78d10a02-6025-46a5-88f8-081fdb607968'));
    //this.Users.push(this.GetFakeUser('78d10a02-6025-46a5-88f8-081fdb607968'));
    //this.Users.push(this.GetFakeUser('78d10a02-6025-46a5-88f8-081fdb607968'));
    //this.Users.push(this.GetFakeUser('78d10a02-6025-46a5-88f8-081fdb607968'));

  }

}
