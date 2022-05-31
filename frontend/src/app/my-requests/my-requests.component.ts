import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {User} from "../components/user";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-my-requests',
  templateUrl: './my-requests.component.html',
  styles: [
  ]
})
export class MyRequestsComponent implements OnInit {
  @Output() user = new EventEmitter<User>();
  loginForm: FormGroup;
  currentUser: User;

  appointments: Appointment[] = [];

  constructor(private appointmentService:AppointmentService, private authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.validateLoginStateByToken()){
      this.currentUser = this.authService.getCurrentUser();
      this.user.emit(this.currentUser);
      this.appointmentService.getAll().subscribe(res => this.appointments = res);
    }
  }


  isLoggedIn(){
    return this.authService.validateLoginStateByToken();
  }

}
