import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth.service';

@Component({
  templateUrl:"./header.Component.html",
  selector:'app-header'
})
export class HeaderComponent{
  constructor(private datastorageService : DataStorageService,
              private authService : AuthService){}
  onSaveData(){
    this.datastorageService.storeRecipes()
    .subscribe(
      (response:Response)=>{
        console.log(response);
      }
    );
  }
  onFetchData(){
    this.datastorageService.getRecipes();
  }
  onLogout(){
    this.authService.logout();
  }
}
