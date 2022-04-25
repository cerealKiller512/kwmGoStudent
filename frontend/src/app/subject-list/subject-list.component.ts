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

  constructor(private subjectListService:SubjectListService,
    private categoryListService: CategoryListService,
    private levelListService: LevelListService) {
  }

  ngOnInit(){
    console.log("cat:", this.categoryListService.selectedCategory.value)
    console.log("level:", this.levelListService.selectedLevel.value)
    this.subjectListService.getAll(this.categoryListService.selectedCategory.value?.id, this.levelListService.selectedLevel.value?.id).subscribe(res =>this.subjects = res);


  }

  selectSubject(subject: Subject): void {
    this.subjectListService.selectedSubject.next(subject);
  }
}
