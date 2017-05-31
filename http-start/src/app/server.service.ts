import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
 export class ServerService{
   constructor(private http : Http) {}
   storeServers(servers : any[]){
    const headers = new Headers({'Content-Type':'application/json'})
    //  return this.http.post('https://angualr2practice.firebaseio.com/data.json',
    //  servers, {headers:headers})
     return this.http.put('https://angualr2practice.firebaseio.com/data.json',
     servers, {headers:headers})
   }
   getServers(){
     return this.http.get('https://angualr2practice.firebaseio.com/data.json')
     .map(
       (response:Response)=>{
         const data = response.json();
         for(const server of data){
           server.name='FETCHED_'+server.name;
         }
         return data
       }
     ).catch(
       ( error: Response)=>{
         return Observable.throw(error);
       }
     );
   }
   getAppName(){
     return this.http.get('https://angualr2practice.firebaseio.com/appName.json')
     .map(
       (response: Response)=>{
         return response.json();
       }
     );
   }
 }
