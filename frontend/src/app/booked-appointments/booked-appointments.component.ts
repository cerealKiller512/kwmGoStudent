import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../components/user";
import {FormGroup} from "@angular/forms";
import {Subject} from "../components/subject";
import {SubjectService} from "../shared/subject.service";
import {AuthService} from "../shared/auth.service";
import {Appointment} from "../components/appointment";
import {AppointmentService} from "../shared/appointment.service";
import {ToastrService} from "ngx-toastr";
import {ToastrModule} from "ngx-toastr";
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
  selectedOption:string;

  options = [
    {name:"ordnungsgemäß durchgeführt", value:1},
    {name:"Suchende*r nicht erschienen", value:2},
    {name:"Termin verschoben", value:3},
    {name:"Anderes", value:4}

  ]

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
      this.appointmentService.getBooked().subscribe(res => this.appointments = res);
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

  print(){
    this.printedOption = this.selectedOption;
  }

  onChangeStatus() {

  }


  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
