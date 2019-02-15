import { UserRoles } from './GlobalEnums';
import { WebApiService } from './web-api.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoginData } from './Interfaces/ILoginData';

@Injectable()
export class AccauntService {

  private jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private ApiService : WebApiService) { }

  async Login(loginData : ILoginData) {
    
    await this.ApiService.Login(loginData)
                         .then(response => {})
                         .catch(error => {});
    




  } 

  get User() {

    return '';
  }

  isInRole(role : number) : boolean {



      return true
  }

  isLoggedIn() : boolean {

    return true
}

}
