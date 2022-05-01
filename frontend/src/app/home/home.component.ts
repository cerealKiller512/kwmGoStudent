import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";
import {AuthService} from "../shared/auth.service";
@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  isLoggedInAsTeacher(){
    return this.authService.isLoggedInAsTeacher
  }

  subjectSelected(subject: Subject) {
    this.router.navigate(['../subjects', subject.id], {
      relativeTo: this.route
    });
  }
}
