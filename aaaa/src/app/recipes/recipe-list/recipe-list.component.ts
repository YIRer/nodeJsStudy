import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] =[
    new Recipe('A test recipe', 'This is simply a test','https://farm5.staticflickr.com/4158/34464639275_ec323c4bfd.jpg'),
    new Recipe('A test recipe', 'This is simply a test2','https://farm5.staticflickr.com/4158/34464639275_ec323c4bfd.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe : Recipe){
    // recipeWasSelected 라는 이벤트를 생성하여 실행시키고 선택한 레시피 값이 들어감
    console.log(recipe);
    this.recipeWasSelected.emit(recipe);
  }

}
