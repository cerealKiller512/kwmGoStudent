import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {Subject, User} from "../components/subject";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'bs-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {
  @Output() user = new EventEmitter<User>();
  loginForm: FormGroup;
  currentUser: User;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      this.user.emit(this.currentUser);
    }
  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }





}
