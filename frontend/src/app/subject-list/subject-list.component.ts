import { Component, OnInit } from '@angular/core';
import {Subject, User} from "../components/subject";
import { CategoryListService } from '../shared/category-list.service';
import { LevelListService } from '../shared/level-list.service';
import {SubjectListService} from "../shared/subject-list.service";

@Component({
  selector: 'bs-subject-list',
  templateUrl: './subject-list.component.html',
  styles: []
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  filteredSubjects: Subject[] = [];
  selectedFilter = '0';

  filterOptions = [
    { key: 0, value: "Alle Angebote" },
    { key: 1, value: "unter 20€/h" },
    { key: 2, value: "20€/h bis 30€/h" },
    { key: 3, value: "30€/h bis 50€/h" },
    { key: 4, value: "über 50€/h" },
  ]

  constructor(private subjectListService:SubjectListService,
    private categoryListService: CategoryListService,
    private levelListService: LevelListService) {
  }

  ngOnInit(){

    this.subjectListService.getAll(this.categoryListService.selectedCategory.value?.id, this.levelListService.selectedLevel.value?.id)
      .subscribe(res => {
        this.subjects = res;
        this.filterSubjects();
      });
  }

  filterSubjects() {
    this.filteredSubjects = this.subjects.filter((subject) => {
      switch (this.selectedFilter) {
        case "0":
          return subject;
        case "1":
          if (subject.price <= 20) return subject;
          return null;
        case "2":
          if (subject.price >= 20 && subject.price <= 30) return subject;
          return null;
        case "3":
          if (subject.price >= 30 && subject.price <= 50) return subject;
          return null;
        case "4":
          if (subject.price >= 50) return subject;
          return null;
      }
      return null;
    })
  }

  selectSubject(subject: Subject): void {
    this.subjectListService.selectedSubject.next(subject);
  }
}
