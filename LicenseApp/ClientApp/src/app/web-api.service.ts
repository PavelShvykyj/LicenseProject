import { ILoginData } from './Interfaces/ILoginData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInResource } from './Interfaces/IUserData';

@Injectable()
export class WebApiService {
  private BASE_URL : string = "/api";
  testField : string = "Меня видно";

  constructor(private http : HttpClient ) { }

  
  async Login(userData : ILoginData) : Promise<string>  {

    let headers = new HttpHeaders().append('Authorization','none').append('Content-Type','text/json')
    let connection = this.BASE_URL+"/login";
    
    let request = await this.http.post(connection, userData, {
      headers: headers,
      observe: 'body',
      withCredentials: false,
      reportProgress: false,
      responseType: 'text'
    }).toPromise();

    return request;
  }


  async GetUsers() : Promise<string>  {

    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization','Bearer '+token).append('Content-Type','text/json')
    let connection = this.BASE_URL+"/getusers";
    let requestResult : ISignInResource;

    let request = await this.http.get(connection, {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    } ).toPromise()

    return request;
  }

  UserNameExist(name : string ) : Promise<boolean> {
        //// Fake 
        return new Promise ((reject, resolve) => {
            setTimeout(() => {
              reject((name == "Administrator"))
            }, 2000);
        });
  }

}
