import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebApiService {
  private BASE_URL : string = "https://localhost:44308/api/";

  constructor(private http : HttpClient ) { }

  




}
