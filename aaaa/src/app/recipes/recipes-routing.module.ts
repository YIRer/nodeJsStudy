import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGruard } from '../auth/auth-guard.service';

const recipesRoutes : Routes = [
  { path:'recipes', component:RecipesComponent,
    children:[
      {path:'', component:RecipeStartComponent},
      {path:'new', component:RecipeEditComponent, canActivate:[AuthGruard]},
      {path:':id', component:RecipeDetailComponent},
      {path:':id/edit', component:RecipeEditComponent, canActivate:[AuthGruard]}
    ]
  }
];

@NgModule({
  imports:[
      RouterModule.forChild(recipesRoutes)
  ],exports : [RouterModule]
})
export class RecipesRoutiongModule{

}
