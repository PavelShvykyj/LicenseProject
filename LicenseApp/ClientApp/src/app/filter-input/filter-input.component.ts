import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent implements OnInit {

  @Input('FilterName') filterName : string  ;
  @Output('FilterChagedEmiter') filterChaged = new EventEmitter();
  filterValue : string = "";


  constructor() { }

  ngOnInit() {
    
  }

  OnFilterInput() {
    let eventValue = {
      filterName : this.filterName,
      filterValue : this.filterValue
    }
    this.filterChaged.emit(eventValue);
  }

  ClearFilter(inputelement) {
    this.filterValue = "";
    this.OnFilterInput();  
  }

}
