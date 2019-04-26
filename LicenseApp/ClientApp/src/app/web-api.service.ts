import { ILoginData } from './Interfaces/ILoginData';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignInResource, ILicenseUserState,  ILicenseUsers } from './Interfaces/IUserData';
import { map, delay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class WebApiService {
  private BASE_URL: string = "/api";
  

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }


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

  async GetLiceseUsers(userId? : string) : Promise<ILicenseUsers> {
    
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let params = new HttpParams();

    let connection = this.BASE_URL + "/licenseusers";

    if(userId) {
      params = params.append('UserId', userId);
    }

    let request = await  this.http.get(connection, {
      headers: headers,
      observe: 'body',
      params: params,
      withCredentials: true,
      reportProgress: false,
      responseType: 'text'
    }).pipe(map(res => JSON.parse(res))).toPromise();

    return request; 
  }

  GetLiceseFile(Id : string) {
    
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + `/licensefile/${Id}`;
    
    this.http.get(connection, {
      headers: headers,
      observe: 'body',
      withCredentials: true,
      reportProgress: false,
      responseType: 'blob'
    }).toPromise().then(res => {
      this.DownloadFile(res, `license_${Id}.txt`);
    });

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

  async UpdateLicenseUser(UserData : ISignInResource ) : Promise<string> {
 
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/updatelicenseuser/"+UserData.Id;
    
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

  async SigninLicense(UserData : ISignInResource) : Promise<string> {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token).append('Content-Type', 'text/json')
    let connection = this.BASE_URL + "/SignInLicense";
    
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

  /// ВПОМОГАТЕЛЬНЫЕ
  DownloadFile(fileData : Blob | string,  FileName : string) {
    let fileStream : Blob; /// переменная типа поток битов сохранить можно такую переменную File насленик от Blob
    
    /// если получили строку на ее основании создаем блоб , вызываем типовый конструктор 
    if (typeof fileData == 'string' ) {
      fileStream = new Blob([fileData],{ type: "text/csv" });
    } 
    else {
      fileStream = fileData;
    }
    
    /// скачивание происходит програмным нажатием на элемент типа линк
    /// линк может качать имея урл и имя файла в своих атрибутах
    /// создаем урл основанный не на адресе а на самих данных
    let fileUrl = window.URL.createObjectURL(fileStream);
    /// создаем и заполняем елемент
    let link = document.createElement("a");
    link.setAttribute("href", fileUrl);
    link.setAttribute("download", FileName);
    link.style.visibility = 'hidden';
    /// добавляем его в ДОМ кликаем и удалем 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  

}
