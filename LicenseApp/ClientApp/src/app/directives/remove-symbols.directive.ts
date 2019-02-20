import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[RemoveSymbols]'
})
export class RemoveSymbolsDirective {
  @Input('RemoveSymbols') RemoveSymbols: Array<string>

  constructor(private el: ElementRef) { }

  @HostListener('blur')
  OnBlur() {
    console.log('on blur');
    let value: string = this.el.nativeElement.value;
    console.log(value);
    this.RemoveSymbols.forEach(symbol => {
      value = value.replace(RegExp(symbol,'g') ,  "");
    });

    this.el.nativeElement.value = value;
  }

}
