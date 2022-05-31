import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {AuthService} from "../shared/auth.service";
import {Subject} from "../components/subject";
import {SubjectService} from "../shared/subject.service";
import {SubjectListService} from "../shared/subject-list.service";

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

  constructor(private subjectService:SubjectService, private subjectListService:SubjectListService, private authService:AuthService) {
  }

  ngOnInit(): void {
    if(this.authService.validateLoginStateByToken()){
      this.currentUser = this.authService.getCurrentUser();
      this.user.emit(this.currentUser);
      this.subjectService.getAll().subscribe(res => this.subjects = res);
    }
  }


  isLoggedIn(){
    return this.authService.validateLoginStateByToken();
  }

  selectSubject(subject: Subject): void {
    this.subjectListService.selectedSubject.next(subject);
  }

}
