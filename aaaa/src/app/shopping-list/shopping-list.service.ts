import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
  IngredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('tomatos',10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.IngredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    // for(let ingredient of  ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.IngredientsChanged.next(this.ingredients.slice());
  }

  UpdateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.IngredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.IngredientsChanged.next(this.ingredients.slice());
  }
}
