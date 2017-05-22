import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe:Recipe;
  constructor(private recicpeService : RecipeService) { }

  ngOnInit() {
  }
  onAddToShoppingList(){
    this.recicpeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
