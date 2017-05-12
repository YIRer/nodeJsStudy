import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template:
  // `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  templateUrl:'./servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationsStatus = 'No server was Created!';
  serverName ='Test Server';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
      setTimeout(()=>{this.allowNewServer = true},2000);
  }

  ngOnInit() {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    // this.serverCreationsStatus = 'Server Created! ServerName is ' +this.serverName
    setTimeout(()=>{this.serverCreated = false; this.serverName='';},500);

  }
  onUpdateServerName(event:any){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
