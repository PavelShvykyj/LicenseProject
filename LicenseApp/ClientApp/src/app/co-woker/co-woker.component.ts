import { Component, OnInit, Input } from '@angular/core';
import { ISignInResource } from '../Interfaces/IUserData';

@Component({
  selector: 'app-co-woker',
  templateUrl: './co-woker.component.html',
  styleUrls: ['./co-woker.component.css']
})
export class CoWokerComponent implements OnInit {

  @Input("User") User : ISignInResource;

  constructor() { }

  ngOnInit() {
  }

}
