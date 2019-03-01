import { ILoginData } from './Interfaces/ILoginData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInResource } from './Interfaces/IUserData';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class WebApiService {
  private BASE_URL: string = "/api";
  

  constructor(private http: HttpClient) { }


  async Login(userData: ILoginData): Promise<string> {

    let headers = new HttpHeaders().append('Authorization', 'none').append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/login";

    let request = await this.http.post(connection, userData, {
      headers: headers,
      observe: 'body',
      withCredentials: false,
      reportProgress: false,
      responseType: 'text'
    }).toPromise();

    return request;
  }


  async GetUsers(): Promise<string> {

    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/users";
    

    let request = await this.http.get(connection, {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    }).toPromise()

    return request;
  }


  async UserExist(url: string): Promise<string> {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + url;


    let request = await this.http.get(connection, {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    }).pipe(delay(0)).toPromise(); /// delay вызываем изза ошибки ангулара в асинхронных директивах

    return request;

  }

  async UserNameExist(name: string): Promise<string> {
    let connection = "/userexist/UserName/" + name;
    return await this.UserExist(connection);

    // //// Fake
    // return new Promise ((reject, resolve) => {
    //     setTimeout(() => {
    //       reject((name == "Administrator"))
    //     }, 1000);
    // });
  }

  async EmailExist(name: string): Promise<string> {
    let connection = "/userexist/Email/" + name;
    return await this.UserExist(connection);

    //// Fake 
    // return new Promise ((reject, resolve) => {
    //     setTimeout(() => {
    //       reject((name == "Fake@Fake"))
    //     }, 1000);
    // });
  }

  async PhoneExist(name: string): Promise<string> {
    let connection = "/userexist/Phone/" + name;
    return await this.UserExist(connection);

    // //// Fake 
    // return new Promise ((reject, resolve) => {
    //     setTimeout(() => {
    //       reject((name == "3333333"))
    //     }, 1000);
    // });
  }

  async UpdateUser(UserData : ISignInResource ) : Promise<string> {
 
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/updateuser/"+UserData.Id;
    
    let request = await this.http.post(connection, UserData , {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    }).toPromise()

    return request;

  }

  async UpdateUserRoles(userid : string , UserRoles : Array<string> ) : Promise<string> {
 
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/updateuserroles/"+userid;
    
    let request = await this.http.post(connection, UserRoles , {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    }).toPromise()

    return request;

  }

  async Signin(UserData : ISignInResource) : Promise<string> {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/signin";
    
    let request = await this.http.post(connection, UserData , {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    }).toPromise()

    return request;

  } 

  async DeleteUser(userid : string) : Promise<string> {
    let token = localStorage.getItem("token");
      let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
      let connection = this.BASE_URL + "/deleteuser/"+userid;
      
      let request = await this.http.post(connection, "", {
        headers: headers,
        observe: 'body',
        withCredentials: true,
        reportProgress: false,
        responseType: 'text'
      }).toPromise()

      return request;
  }

}
