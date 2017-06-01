import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] =[
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://farm8.staticflickr.com/7009/6816478369_5a29c021bc.jpg',
      [
        new Ingredient('Meat', 20),
        new Ingredient('apple', 1)
      ]
    ),
    new Recipe(
      'A test recipe',
      'This is simply a test2',
      'https://farm1.staticflickr.com/743/21749710009_451e29eaab.jpg',
      [
        new Ingredient('Bread', 15),
        new Ingredient('Cheese', 10)
      ]
    )
  ];
  constructor(private slService : ShoppingListService){}
  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
