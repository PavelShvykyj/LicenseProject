import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent implements OnInit {

  @Input('FilterName') filterName : string  ;
  @Output('FilterChagedEmiter') filterChaged = new EventEmitter();
  


  constructor() { }

  ngOnInit() {
    
  }

  OnFilterInput(value : string) {
    let eventValue = {
      filterName : this.filterName,
      filterValue : value
    }
    this.filterChaged.emit(eventValue);
  }

  ClearFilter(inputelement) {
    console.log(inputelement);
    this.OnFilterInput("");  

  }

}
