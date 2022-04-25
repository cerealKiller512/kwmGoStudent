import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../components/subject";

@Component({
  selector: 'a.bs-subject-list-item',
  templateUrl: './subject-list-item.component.html',
  styles: [
  ]
})
export class SubjectListItemComponent implements OnInit {
  @Input() subject:Subject | undefined //wir erwarten uns von außen einen Parameter vom Typ Buch -> @Input

  constructor() { }

  ngOnInit(): void {
  }

}
