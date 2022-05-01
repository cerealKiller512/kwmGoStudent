import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {Appointment} from "../components/appointment";
import {LevelListService} from "../shared/level-list.service";
import {AppointmentService} from "../shared/appointment.service";

@Component({
  selector: 'bs-my-appointments',
  templateUrl: './my-appointments.component.html',
  styles: [
  ]
})
export class MyAppointmentsComponent implements OnInit {
  @Output() user = new EventEmitter<User>();
  loginForm: FormGroup;
  currentUser: User;

  appointments: Appointment[] = [];

  constructor(private appointmentService:AppointmentService, private authService:AuthService) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      this.user.emit(this.currentUser);
      this.appointmentService.getAll().subscribe(res => this.appointments = res);
    }
  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
