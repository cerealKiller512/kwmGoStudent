import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";
@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }



  subjectSelected(subject: Subject) {
    this.router.navigate(['../subjects', subject.id], {
      relativeTo: this.route
    });
  }
}
