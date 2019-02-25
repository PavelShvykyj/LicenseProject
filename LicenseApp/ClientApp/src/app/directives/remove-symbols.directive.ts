import { NgControl } from '@angular/forms';
import { Directive, HostListener, ElementRef, Input, EventEmitter, Output } from '@angular/core';


@Directive({
  selector: '[RemoveSymbols]'
})
export class RemoveSymbolsDirective {
  @Input('RemoveSymbols') RemoveSymbols: Array<string>
  @Output('OnDirectiveChange') OnDirectiveChange = new EventEmitter();

  constructor(private el: ElementRef,private NgControl : NgControl) { }

  @HostListener('blur')
  OnBlur() {
    
    let value: string = this.el.nativeElement.value;
    
    this.RemoveSymbols.forEach(symbol => {
      value = value.replace(RegExp(symbol,'g') ,  "");
    });
    
    this.el.nativeElement.value = value;
    this.OnDirectiveChange.emit({name : this.NgControl.name, value : value });
  }

}
