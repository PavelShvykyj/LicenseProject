import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

/// Для чего и как сделано :
/// если попробовать применить disabled атрибут в теге привязанном к контролу реактивной формы ангулар предложит 
/// вместо этого применить метод control.disable() or control.enable() вот применение этих методов выносим в директиву 
/// в конструкторе инжектируем собственно контрол , делаем инпут свойство disableControl (по имени селектора) благодаря 
/// set оно становиться функцией в ней по праметру получаем имя действия ('disable' : 'enable') и через control['enable'] получаем метод 
/// и вызываем его ()


@Directive({
  selector: '[disableControl]'
})
export class DisableFormcontrolDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
