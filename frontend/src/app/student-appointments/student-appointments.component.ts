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


  @Output() user = new EventEmitter<User>();
  loginForm: FormGroup;
  currentUser: User;

  subject: Subject<User>;
  appointments: Appointment[] = [];

  constructor(private appointmentService:AppointmentService, private authService:AuthService,
              private toastr: ToastrService,    private route:ActivatedRoute, //wie sieht die derzeitige Route im Browser aus
              private router: Router) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      this.user.emit(this.currentUser);
      this.appointmentService.getAppointmentsByStudentId(this.currentUser.id).subscribe(res => this.appointments = res);
    }
  }

  completeAppointment(appointment:Appointment){
    if(confirm('Wollen Sie die Nachhilfe wirklich beenden?')){
      appointment.completed = true;
      this.toastr.warning("Nachhilfe abgeschlossen!", "Nachhilfe erfolgreich beendet");
      this.appointmentService.update(appointment).subscribe(res => this.router.navigate(['../'],
        {relativeTo:this.route}));
    }

  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }


}
