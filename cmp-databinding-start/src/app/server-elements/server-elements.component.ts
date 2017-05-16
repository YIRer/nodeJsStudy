import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-elements',
  templateUrl: './server-elements.component.html',
  styleUrls: ['./server-elements.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class ServerElementsComponent implements
OnInit,
OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy{
  @Input('srvElement') element : {type:string, name:string, content:string};
  @Input() name:string;
  @ViewChild('heading') header:ElementRef;
  @ContentChild('contentParagraph') paragraph : ElementRef;
  constructor() {
    console.log('constructor Call');
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("-----------------------------");
    console.log('ngOnChange Call');
    console.log(changes);
  }

  ngOnInit() {
    console.log("-----------------------------");
    console.log('ng Oninit');
    console.log('textContent : ' + this.header.nativeElement.textContent);
    console.log('textContent of Paragraph : ' + this.paragraph.nativeElement.textContent);
  }
  ngDoCheck(){
    console.log("-----------------------------");
    console.log("ng Docheck Call");
  }
  ngAfterContentInit(){
    console.log("-----------------------------");
    console.log("ng ngAfterContentInit Call");
    console.log('textContent of Paragraph : ' + this.paragraph.nativeElement.textContent);
  }
  ngAfterContentChecked(){
    console.log("-----------------------------");
    console.log("ng ngAfterContentChecked Call");
  }

  ngAfterViewInit(){
    console.log("-----------------------------");
    console.log("ng ngAfterViewInit Call");
    console.log('textContent : ' + this.header.nativeElement.textContent);

  }
  ngAfterViewChecked(){
    console.log("-----------------------------");
    console.log("ng ngAfterViewChecked Call");
  }
  ngOnDestroy(){
    console.log("-----------------------------");
    console.log("ng ngOnDestroy Call");
  }

}
