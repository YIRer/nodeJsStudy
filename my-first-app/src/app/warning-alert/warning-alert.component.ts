import { Component } from '@angular/core';
@Component({
  selector: 'app-warning-arlet',
  template:`
    <p>This is a warning, you are in danger!</p>
  `,
  styles:[
    `
      p{
        padding:20px;
        background-color: rgb(222, 120, 102);
        border:1px red solid;
      }

    `
  ]
})
export class WarningAlertComponent{

}
