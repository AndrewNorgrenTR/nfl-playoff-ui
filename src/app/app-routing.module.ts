import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BracketComponent} from "./bracket/bracket.component";
import {AuthorizationGuard} from "./auth/authorization.guard";
import {LoginComponent} from "./auth/login.component";
import {NewUserComponent} from "./auth/new-user.component";
import {EditPlayoffGamesComponent} from "./admin/edit-playoff-games.component";

const routes: Routes = [
  { path: 'bracket', component: BracketComponent, canActivate: [AuthorizationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: NewUserComponent },
  { path: 'edit-games', component: EditPlayoffGamesComponent },
  { path: '',
    redirectTo: '/bracket',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
