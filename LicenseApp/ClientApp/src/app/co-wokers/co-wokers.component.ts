import { WebApiService } from './../web-api.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'util';
import { ISignInResource } from '../Interfaces/IUserData';

@Component({
  selector: 'app-co-wokers',
  templateUrl: './co-wokers.component.html',
  styleUrls: ['./co-wokers.component.css']
})
export class CoWokersComponent implements OnInit {

  Users : Array<ISignInResource>;

  constructor(private ApiService : WebApiService ) { }

  async Update() {
    await this.ApiService.GetUsers()
      .then(result => {this.Users = JSON.parse(result)})
      .catch(error => {console.log('get users error ',error)});
  }

  ngOnInit() {
     this.Update()
  }

}
