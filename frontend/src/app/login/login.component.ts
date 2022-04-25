import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";


@Component({
  selector: 'bs-login',
  templateUrl: 'login.component.html',
    styles: []
  })
  export class LoginComponent{
    constructor(private router: Router, private route: ActivatedRoute) {
    }

    subjectSelected(subject: Subject) {
      this.router.navigate(['../subjects', subject.id], {
        relativeTo: this.route
      });
    }
  }

