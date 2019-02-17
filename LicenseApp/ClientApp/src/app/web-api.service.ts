import { ILoginData } from './Interfaces/ILoginData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebApiService {
  private BASE_URL : string = "/api";

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
}
