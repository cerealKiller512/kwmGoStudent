import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";


@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title='kwmGoStudent';
  isTeacher: boolean = false;
  userId: number = null;
  isLoggedIn: boolean = true;

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.validateLoginStateByToken();
    this.authService.isLoggedInSubject.subscribe(loginState => {
      this.isLoggedIn = loginState
    });
    this.authService.isLoggedInAsTeacher.subscribe(flag => {
      this.isTeacher = flag;
      if (!this.isTeacher)
        this.userId = this.authService.getCurrentUserId();
    })

  }

  getLoginLabel(){
    if(this.isLoggedIn){
      return "Logout";
    }else{
      return "Login";
    }
  }

}
