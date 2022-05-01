import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";
import {SubjectListService} from "../shared/subject-list.service";
import {SubjectFactory} from "../components/subject-factory";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";
import {AppointmentService} from "../shared/appointment.service";

@Component({
  selector: 'bs-subject-details',
  templateUrl: './subject-details.component.html',
  styles: [
  ]
})
export class SubjectDetailsComponent implements OnInit {


  subject: Subject = SubjectFactory.empty();

  constructor(
    private subjectListService:SubjectListService,
    private appointmentservice: AppointmentService,
    private route:ActivatedRoute, //wie sieht die derzeitige Route im Browser aus
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params; //snapshot der url -> mit params alle Parameter der Url
    this.subjectListService.getSingle(params['id']).subscribe(b =>{
      this.subject = b});
    console.log(this.subject);
    console.log(this.subject.appointments);
  }

  removeSubject(){
    if(confirm('Wollen Sie das Angebot wirklich löschen?')){
      this.toastr.success("Angebot gelöscht!", "Angebot erfolgreich gelöscht");
      this.subjectListService.remove(this.subject.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo:this.route}));
    }
  }

  request(){
    console.log('Request was sent');
    if(confirm('Wollen Sie sich für die ausgewählten Termine verbindlich anmelden?')){
      this.toastr.success("du kannst die ausgewählen Termine im Menüpunkt 'meine Termine' finden", "Erfolgreiche Anmeldung")
      this.appointmentservice.getBooked()
    }
  }

}
