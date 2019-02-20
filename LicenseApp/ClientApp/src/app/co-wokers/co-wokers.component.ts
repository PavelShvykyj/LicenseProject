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

  constructor(private ApiService : WebApiService ) { }

  async Update() {
    await this.ApiService.GetUsers()
      .then(result => {this.Users = JSON.parse(result)})
      .catch(error => {console.log('get users error ',error)});
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
     //this.Update()

     this.Users.push(this.GetFakeUser(1));
     this.Users.push(this.GetFakeUser(2));
     this.Users.push(this.GetFakeUser(3));
     this.Users.push(this.GetFakeUser(4));
     this.Users.push(this.GetFakeUser(5));
     this.Users.push(this.GetFakeUser(6));

  }

}
