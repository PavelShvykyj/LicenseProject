import { FormGroup, FormControl } from '@angular/Forms';
import { Component, OnInit, Input } from '@angular/core';
import { ISignInResource } from '../Interfaces/IUserData';

@Component({
  selector: 'app-co-woker',
  templateUrl: './co-woker.component.html',
  styleUrls: ['./co-woker.component.css']
})
export class CoWokerComponent implements OnInit {

  @Input("User") User : ISignInResource;
  form = new FormGroup({Id : new FormControl(),
                        Email : new FormControl(),
                        UserName : new FormControl(),
                        PhoneNumber : new FormControl()
  });

  
 


  constructor() { }

  ngOnInit() {
  }

  get Email () {
    return this.form.get("Email");
  }

  get UserName () {
    return this.form.get("UserName");
  }

  get PhoneNumber () {
    return this.form.get("PhoneNumber");
  }

  get Id () {
    return this.form.get("Id");
  }

  
}
