import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {AuthService} from "../shared/auth.service";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-student-appointments',
  templateUrl: './student-appointments.component.html',
  styles: [
  ]
})
export class StudentAppointmentsComponent implements OnInit {
  loginForm: FormGroup;
  currentUser: User;

  subject: Subject<User>;
  appointments: Appointment[] = [];

  constructor(private appointmentService:AppointmentService, private authService:AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.authService.validateLoginStateByToken()){
      this.currentUser = this.authService.getCurrentUser();
      this.appointmentService.getAppointmentsByStudentId(this.currentUser.id).subscribe(res => this.appointments = res);
    }
  }

  completeAppointment(appointment:Appointment){
    if(confirm('Wollen Sie die Nachhilfe wirklich beenden?')){
      appointment.completed = true;
      this.appointmentService.update(appointment).subscribe(res => {
        // successful update
        this.toastr.success("Nachhilfe abgeschlossen!", "Nachhilfe erfolgreich beendet");
      });
    }

  }

  isLoggedIn(){
    return this.authService.validateLoginStateByToken();
  }


}
