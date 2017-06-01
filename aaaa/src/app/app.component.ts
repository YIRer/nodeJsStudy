import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';
  onNavigate(feature:string){

      this.loadedFeature = feature;
  }
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBaqF3v_r3WYT4NkM6uneC0Ht5kytXEFi4",
      authDomain: "recipes-6add7.firebaseapp.com"
    })
  }
}
