import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../components/subject";
import {SubjectListService} from "../components/subject-list.service";
import {SubjectFactory} from "../components/subject-factory";
import {ToastrModule, ToastrService} from "ngx-toastr";

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params; //snapshot der url -> mit params alle Parameter der Url
    this.bs.getSingle(params['id']).subscribe(b =>{
      console.log(b);
      this.subject = b});
  }

  getRating(num:number){
    return new Array(num);
  }

  removeSubject(){
    this.toastr.success("Hello KWM - Testen von Nachrichten!", "Buch erfolgreich gelöscht");
    if(confirm('Wollen Sie das Buch wirklich löschen?')){
      this.bs.remove(this.subject.id).subscribe(res => this.router.navigate(['../'],
        {relativeTo:this.route}));
    }
  }

}
