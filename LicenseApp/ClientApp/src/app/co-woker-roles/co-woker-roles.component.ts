import { UserRoles } from './../GlobalEnums';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/Forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'co-woker-roles',
  templateUrl: './co-woker-roles.component.html',
  styleUrls: ['./co-woker-roles.component.css']
})
export class CoWokerRolesComponent implements OnInit {

  @Input("Id") Id : string;
  @Input("Roles") Roles : Array<string>;

  @Output("Undo") UndoEmmiter = new EventEmitter();
  @Output("Save") SaveEmmiter = new EventEmitter();
  
  form = new FormGroup({
    Administrator : new FormControl(),
    Manager : new FormControl(),
    LicenseUser : new FormControl()
  })

  constructor() { }

  ngOnInit() {
    this.UploadRolesToForm();
  }

  
  UndoChanges() {
    this.UndoEmmiter.emit();
  }

  SaveChanges() {
    
    this.UploadFormToRoles();
    this.SaveEmmiter.emit(this.Roles)
  }

  UploadRolesToForm() {
    for (let index = 0; index < 3; index++) {
      let el = this.form.get(UserRoles[index]);
      el.patchValue(false);
    }
    
    this.Roles.forEach(role => {
      let el = this.form.get(role);
      el.patchValue(true);
    });
  }

  UploadFormToRoles() {
    
    this.Roles = [];
    for (let index = 0; index < 3; index++) {
      let el = this.form.get(UserRoles[index]);
      if (el.value) {
        this.Roles.push(UserRoles[index]);
      }
    }
  }

}
