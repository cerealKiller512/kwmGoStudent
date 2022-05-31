import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

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
  printedOption:string;

  options = [
    {name:"Wähle ein Abschluss-Statement", value:0},
    {name:"ordnungsgemäß durchgeführt", value:1},
    {name:"Suchende*r nicht erschienen", value:2},
    {name:"Termin verschoben", value:3},
    {name:"Anderes", value:4}
  ];

  appointments: Appointment[] = [];

  constructor(private appointmentService:AppointmentService,
              private authService:AuthService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    if(this.authService.validateLoginStateByToken()){
      this.currentUser = this.authService.getCurrentUser();
      this.user.emit(this.currentUser);
      this.appointmentService.getBooked().subscribe(res => this.appointments = res);
    }
  }

  completeAppointment(appointment:Appointment){
    if(confirm('Wollen Sie das Nachhilfe-Angebot wirklich beenden?')){
      appointment.completed = true;
      this.toastr.success("Angebot beendet", "Das Nachhilfe-Angebot wurde nun abgeschlossen.");
      this.appointmentService.update(appointment).subscribe(res => {
      });
    }
  }

  reactivate(appointment: Appointment) {
    if(confirm('Wollen Sie das Nachhilfe-Angebot wirklich wieder aktiv schalten?')){
      appointment.completed = false;
      appointment.status = '';
      this.toastr.success("Reaktiviert", "Das Nachhilfe-Angebot wurde erfolgreich reaktiviert.");
      this.appointmentService.update(appointment).subscribe(res => {
      });
    }
  }

  onChangeStatus(appointment: Appointment, event: Event) {
    appointment.status = (event.target as HTMLInputElement).value;
  }


  isLoggedIn(){
    return this.authService.validateLoginStateByToken();
  }

}
