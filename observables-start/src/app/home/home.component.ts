import { Component, OnInit,OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
                      .map((data:number)=>{
                        return data * 2;
                      });
    this.numbersObsSubscription = myNumbers.subscribe(
      (number :Number)=>{
        console.log(number);
      }
    );
    const myObservable = Observable.create(
      (observer:Observer<string>) => {
        setTimeout(()=>{
          observer.next('fisrt pakage');
        },2000);
        setTimeout(()=>{
          observer.next('second pakage');
        },4000);
        setTimeout(()=>{
          // observer.next('error');
          observer.complete();
        },5000);
        setTimeout(()=>{
          observer.next('third pakage');
        },6000);
      });
      this.customObsSubscription = myObservable.subscribe((data:string)=>{
        console.log(data);
      },(error:string)=>{
        console.log(error);
      },()=>{
        console.log('complated!');
      }
    );
  }
  ngOnDestroy(){
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
