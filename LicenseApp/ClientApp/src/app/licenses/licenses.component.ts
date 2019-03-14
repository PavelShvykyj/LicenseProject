import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {

  isExpanded = true;
  isListExpanded = false;
  itemName = 'long name far far'

  constructor() { }

  ngOnInit() {
  }

  Expanded() {
    this.isExpanded = !this.isExpanded;
    this.itemName = this.isExpanded ? 'long name far far' : 'SHT';

   

  }

  ListExpanded() {
    this.isListExpanded = !this.isListExpanded;


  }

}
