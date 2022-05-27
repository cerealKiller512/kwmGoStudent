import {Component, OnInit} from '@angular/core';
import {Subject} from "./components/subject";
import {AuthService} from "./shared/auth.service";
import {ChatAdapter} from "ng-chat";
//import {MyAdapter} from 'my-adapter';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
    title='kwmGoStudent';
    isTeacher: boolean = false;
    userId: number = null;

    constructor(private authService:AuthService) {}

    ngOnInit(): void {
      this.authService.isLoggedInAsTeacher.subscribe(flag => {
        // console.log("isTeacher: ", flag);
        this.isTeacher = flag;
        if (!this.isTeacher)
          this.userId = this.authService.getCurrentUser().id;
      })

    }

    isLoggedIn(){
      // console.log("... isLoggedIn")
      return this.authService.isLoggedIn();
    }


    getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }else{
      return "Login";
    }

    }

    //public adapter:ChatAdapter = MyAdapter();
}
