import { Component,EventEmitter, Output } from '@angular/core';
@Component({
  templateUrl:"./header.Component.html",
  selector:'app-header'
})
export class HeaderComponent{
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }
}
