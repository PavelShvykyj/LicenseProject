import { UserRoles } from './GlobalEnums';
import { WebApiService } from './web-api.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoginData } from './Interfaces/ILoginData';
import { IUserJWTData } from './Interfaces/IUserData';

@Injectable()
export class AccauntService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private ApiService: WebApiService) { }

  /// получает токен (т.е. только смена токена через запрос)
  /// посмотреть не нужно ли перекодировать символы как то в токене
  async Login(loginData: ILoginData) {

    localStorage.removeItem("token");
    await this.ApiService.Login(loginData)
      .then(response => { localStorage.setItem("token", response) })
      .catch(error => { console.log('request error ', error) });

  }

  Logout() {
    localStorage.removeItem('token');
  }

  get User(): IUserJWTData | undefined {
    if (!this.isLoggedIn()) {
      return undefined;
    }
    return this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }

  isInRole(role: number): boolean {

    let currUser: IUserJWTData = this.User;

    /// незалогиненный точно не имеет роли
    if (typeof currUser == 'undefined') {
      return false;
    }

    /// передали значение перечисления - получим его имя
    let roleName = UserRoles[role];

    /// по имени определим есть ли роль у юзера
    if (typeof currUser.role == 'string') {
      return (currUser.role == roleName)

    } else {
      //// find вернет или undefined или елемент если тип не undefined - значит нашли значит роль присутвует 
      return (typeof currUser.role.find(element => { return element == roleName }) != 'undefined');
    }

  }

  isLoggedIn(): boolean {
    let tokenEncoded = localStorage.getItem("token");
    if (!tokenEncoded) {
      return false;
    }
    try {
      return !this.jwtHelper.isTokenExpired(tokenEncoded)
    } catch (error) {
      console.log('jwt token decode error', error);
      return false;
    }
  }

}
