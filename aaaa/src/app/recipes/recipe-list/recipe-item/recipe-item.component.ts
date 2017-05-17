import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // 변수 recipe 양식을가진 레시피 값을 외부에서 받아옴
  @Input() recipe: Recipe;
  // 값을 리턴하지 않는 이벤트 즉, 값만 받아오는 이벤트 생성
  @Output() recipeSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onSelected(){
    //recipeSelected 라는 이름의 이벤트를 발생.
    // console.log(this.recipeSelected);
    this.recipeSelected.emit();
  }

}
