import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { LevelListComponent } from './level-list/level-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {SubjectListService} from "./shared/subject-list.service";
import { SubjectListItemComponent } from './subject-list-item/subject-list-item.component';
import {CategoryListService} from "./shared/category-list.service";
import {LevelListService} from "./shared/level-list.service";
import { SearchComponent } from './search/search.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthService} from "./shared/auth.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import { TokenInterceptorService } from './shared/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    CategoryListComponent,
    LevelListComponent,
    SubjectDetailsComponent,
    HomeComponent,
    SubjectListItemComponent,
    SearchComponent,
    SubjectFormComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [SubjectListService, CategoryListService, LevelListService,
  AuthService, {
    provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
