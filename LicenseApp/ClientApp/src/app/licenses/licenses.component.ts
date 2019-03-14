import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {

  isExpanded = true;
  isListExpanded = false;

  constructor() { }

  ngOnInit() {
  }

  Expanded() {
    this.isExpanded = !this.isExpanded;
  }

  ListExpanded() {
    this.isListExpanded = !this.isListExpanded;
  }

}
