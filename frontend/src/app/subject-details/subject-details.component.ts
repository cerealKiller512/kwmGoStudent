import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";
import {SubjectListService} from "../shared/subject-list.service";
import {SubjectFactory} from "../components/subject-factory";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-subject-details',
  templateUrl: './subject-details.component.html',
  styles: [
  ]
})
export class SubjectDetailsComponent implements OnInit {


  subject: Subject = SubjectFactory.empty();

  constructor(
    private bs:SubjectListService,
    private route:ActivatedRoute, //wie sieht die derzeitige Route im Browser aus
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params; //snapshot der url -> mit params alle Parameter der Url
    this.bs.getSingle(params['id']).subscribe(b =>{
      this.subject = b});
  }

  removeSubject(){
    this.toastr.success("Angebot gelöscht!", "Angebot erfolgreich gelöscht");
    if(confirm('Wollen Sie das Angebot wirklich löschen?')){
      this.bs.remove(this.subject.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo:this.route}));
    }
  }



}
