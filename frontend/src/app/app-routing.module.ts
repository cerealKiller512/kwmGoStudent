import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectDetailsComponent} from "./subject-details/subject-details.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {LevelListComponent} from "./level-list/level-list.component";
import {SubjectFormComponent} from "./subject-form/subject-form.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'subjects', component:SubjectListComponent},
  {path: 'subjects/:id', component:SubjectDetailsComponent}, ///: Parameter in Angular
  {path: 'categories', component: CategoryListComponent},
  {path: 'levels', component: LevelListComponent},
  {path: 'admin', component: SubjectFormComponent, canActivate:[CanNavigateToAdminGuard]},
  {path: 'admin/:id', component: SubjectFormComponent, canActivate: [CanNavigateToAdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})

export class AppRoutingModule{

}
