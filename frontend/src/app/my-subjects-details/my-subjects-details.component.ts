import { Component, OnInit } from '@angular/core';
import {Subject} from "../components/subject";
import {SubjectFactory} from "../components/subject-factory";
import {SubjectListService} from "../shared/subject-list.service";
import {AppointmentService} from "../shared/appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-my-subjects-details',
  templateUrl: './my-subjects-details.component.html',
  styles: [
  ]
})
export class MySubjectsDetailsComponent implements OnInit {


  subject: Subject = SubjectFactory.empty();

  constructor(
    private subjectListService:SubjectListService,
    private appointmentService: AppointmentService,
    private route:ActivatedRoute, //wie sieht die derzeitige Route im Browser aus
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params; //snapshot der url -> mit params alle Parameter der Url
    this.subjectListService.getSingle(params['id']).subscribe(b =>{
      this.subject = b});
  }

  removeSubject(){
    if(confirm('Wollen Sie das Angebot wirklich löschen?')){
      this.toastr.success("Angebot gelöscht!", "Angebot erfolgreich gelöscht");
      this.subjectListService.remove(this.subject.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo:this.route}));
    }

   }

}
