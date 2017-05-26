import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

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
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
