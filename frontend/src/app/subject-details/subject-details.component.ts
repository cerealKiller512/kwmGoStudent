import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";
import {SubjectListService} from "../shared/subject-list.service";
import {SubjectFactory} from "../components/subject-factory";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";
import {AppointmentService} from "../shared/appointment.service";
import {Appointment} from "../components/appointment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SubjectService} from "../shared/subject.service";


@Component({
  selector: 'bs-subject-details',
  templateUrl: './subject-details.component.html',
  styles: [
  ]
})
export class SubjectDetailsComponent implements OnInit {
  subject: Subject = SubjectFactory.empty();
  appointmentBookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private subjectListService:SubjectListService,
    private route:ActivatedRoute, //wie sieht die derzeitige Route im Browser aus
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.init();
  }
  
  init() {
    this.appointmentBookingForm = this.fb.group({});
    this.subjectListService.getSingle(this.route.snapshot.params['id']).subscribe(subject =>{
      this.subject = subject;
      for (const appointment of this.subject.appointments) {
        this.appointmentBookingForm.addControl(appointment.id.toString(), new FormControl());
      };
    });
  }
  
  submitForm(){
    const checkedAppointments = Object.entries(this.appointmentBookingForm.value).filter(item => item[1] == true).map(item => Number(item[0]));
    const student_id = this.authService.getCurrentUserId();

    if(confirm("Wollen Sie sich verbindlich für die ausgewählten Nachhilfe-Termine anmelden?")){
      // put / update appointments with userid
      this.subjectService.setAppointmentsForUser(student_id, checkedAppointments).subscribe(res => {
        this.toastr.success("Danke für deine Reservierung!", "Anmeldung erfolgreich.");
        this.init();
      });
    }
  }

  sendComment(){
    this.toastr.success("Der Nachhilfe-Lehrer wurde verständigt und wird nach Möglichkeit einen neuen Termin zur Liste hinzufügen.", "Nachricht erfolgreich gesendet!")
  }

}
