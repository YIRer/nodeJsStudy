import { EventEmitter,Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
  recipeSelected =  new EventEmitter<Recipe>()
  private recipes: Recipe[] =[
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://farm5.staticflickr.com/4158/34464639275_ec323c4bfd.jpg',
      [
        new Ingredient('Meat', 20),
        new Ingredient('apple', 1)
      ]
    ),
    new Recipe(
      'A test recipe',
      'This is simply a test2',
      'https://farm5.staticflickr.com/4158/34464639275_ec323c4bfd.jpg',
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
  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
