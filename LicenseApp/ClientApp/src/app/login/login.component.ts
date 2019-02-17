import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AccauntService } from './../accaunt.service';
import { Component, OnInit } from '@angular/core';
import { ILoginData } from '../Interfaces/ILoginData';
import { Router } from '@angular/router';
import { FormControl,  FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form = new FormGroup( {
    login : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)}    
  );

  
  constructor(private AccSevise: AccauntService, private Router: Router) { }

  ngOnInit() {
  }

  get PasswordControl() {
    return this.form.get('password');
  }

  get LoginControl() {
    return this.form.get('login');
  }

  async Login() {
    let loggdata : ILoginData = {
      login : this.LoginControl.value,
      password : this.PasswordControl.value
    }
    await this.AccSevise.Login(loggdata);
    if (this.AccSevise.isLoggedIn()) {
      this.Router.navigate(['']);
    } else {
      this.LoginControl.setErrors({"notCorrect" : true});
      this.PasswordControl.setErrors({"notCorrect" : true});
      console.log('set errors');
    }

  }

  async  FakeLogin() {
    
    
    let fakeloggdata : ILoginData = {
      login : "Administrator",
      password : "Abc123!"
    }
    await this.AccSevise.Login(fakeloggdata);
    if (this.AccSevise.isLoggedIn()) {
      this.Router.navigate(['']);
    }
  }

}
