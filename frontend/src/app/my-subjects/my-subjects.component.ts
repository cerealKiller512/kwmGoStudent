import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {AuthService} from "../shared/auth.service";
import {Subject} from "../components/subject";
import {SubjectService} from "../shared/subject.service";

@Component({
  selector: 'bs-my-subjects',
  templateUrl: './my-subjects.component.html',
  styles: [
  ]
})
export class MySubjectsComponent implements OnInit {
  @Output() user = new EventEmitter<User>();
  loginForm: FormGroup;
  currentUser: User;

  subjects: Subject[] = [];

  constructor(private subjectService:SubjectService, private authService:AuthService) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      this.user.emit(this.currentUser);
      this.subjectService.getAll().subscribe(res => this.subjects = res);
    }
  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
