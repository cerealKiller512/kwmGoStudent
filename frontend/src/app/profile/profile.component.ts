import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService, Response} from "../shared/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import {User} from "../components/subject";
import {ProfileFactory} from "../components/profile-factory"
import {FormBuilder, FormGroup} from "@angular/forms";
import {Appointment} from "../components/appointment";
import {SubjectFormErrorMessages} from "../subject-form/subject-form-error-messages";
import {ProfileService} from "../shared/profile.service";
import {Student} from "../components/student";


@Component({
  selector: 'bs-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  errors: { [key: string]: string } = {};
  userForm: FormGroup;
  currentUser: User | Student;
  user = ProfileFactory.empty();


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private profileService: ProfileService
  ) {
    this.userForm = this.fb.group({});

  }

  ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      this.initProfileForm();
  }

  initProfileForm(){
    this.userForm = this.fb.group({
      id: this.currentUser.id,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
    });
  }

  submitForm(){
    const user = ProfileFactory.fromObject(this.userForm.value);

    let password = "";

    if (password = prompt("Zum Aktualisieren bitte Passwort eingeben:")){
      this.profileService.validatePw(password, user.id).subscribe(res => {
        if (res != null && res != {} && res != undefined) {
          this.profileService.update(user).subscribe(res => {

            this.authService.login(this.authService.isLoggedInAsTeacher.value ? "teacher" : "student",
              user.email,
              password).subscribe(res => {

              this.authService.setSessionStorage((res as Response).access_token);
              this.authService.validateLoginStateByToken();
              this.currentUser = this.authService.getCurrentUser();

            })

          })
        }
      })



    }
  }


}
