import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {Subject} from "../components/subject";
import {SubjectService} from "../shared/subject.service";
import {AuthService} from "../shared/auth.service";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";

@Component({
  selector: 'bs-booked-appointments',
  templateUrl: './booked-appointments.component.html',
  styles: [
  ]
})
export class BookedAppointmentsComponent implements OnInit {
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
      this.appointmentService.getBooked().subscribe(res => this.appointments = res);
    }
  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
