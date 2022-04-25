import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {Subject, User} from "../components/subject";

@Component({
  selector: 'bs-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {
  @Output() user = new EventEmitter<User>();
  currentUser: User;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.currentUser.id = this.authService.getCurrentUserId();
      this.user.emit(this.currentUser);
    }
  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getCurrentUserData(){
    return this.authService.getUserData(this.);
  }


}
