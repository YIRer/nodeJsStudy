import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth.service';

@Injectable()

export class DataStorageService{

  constructor(private http:Http,
              private recipeService : RecipeService,
              private authService : AuthService){}
  storeRecipes(){
    const token = this.authService.getToken();

    return  this.http.put('https://recipes-6add7.firebaseio.com/recipes.json?auth=' + token,
            this.recipeService.getRecipes()
    );
  }
  getRecipes(){
    const token = this.authService.getToken();

    this.http.get('https://recipes-6add7.firebaseio.com/recipes.json?auth=' + token )
    .map(
      (response:Response)=>{
        const recipes:Recipe[] = response.json();
        for (let recipe of recipes){
          if(!recipe['ingredients']){
            console.log(recipe)
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ).subscribe(
      (recipes : Recipe[])=>{
        // const recipes:Recipe[] = response.json()
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
