import { Component } from '@angular/core';
import {Subject} from "./components/subject";
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private authService:AuthService) {}


    isLoggedIn(){
      return this.authService.isLoggedIn();
    }

    getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }else{
      return "Login";
    }

    }
}
