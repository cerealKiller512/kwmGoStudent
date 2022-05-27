import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, filter, distinctUntilChanged, switchMap, tap} from
    'rxjs/operators';
import {Subject} from '../components/subject';
import {SubjectListService} from '../shared/subject-list.service';
@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  keyup = new EventEmitter<string>();
  foundSubjects: Subject[] = [];
  isLoading = false;
  @Output() subjectSelected = new EventEmitter<Subject>();

  constructor(private bs: SubjectListService){

  }

  ngOnInit() {
    this.keyup.pipe(filter(term => term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe((subjects) => {
        console.log(subjects)
        this.foundSubjects = subjects;
      });
  }
}
