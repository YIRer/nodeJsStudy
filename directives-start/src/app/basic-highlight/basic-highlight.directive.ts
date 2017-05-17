import { Directive,ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[appBasicHightLight]'
})
export class BasicHighLight implements OnInit {

  constructor(private elementRef: ElementRef){}
  ngOnInit(){
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }


}
