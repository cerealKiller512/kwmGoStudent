import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../components/subject";

@Component({
  selector: 'a.bs-subject-list-item',
  templateUrl: './subject-list-item.component.html',
  styles: [
  ]
})
export class SubjectListItemComponent implements OnInit {
  @Input() subject:Subject | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
