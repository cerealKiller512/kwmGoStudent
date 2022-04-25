import { Component, OnInit } from '@angular/core';
import {Category} from "../components/category";
import {Level} from "../components/level";
import {LevelListService} from "../shared/level-list.service";

@Component({
  selector: 'bs-level-list',
  templateUrl: './level-list.component.html',
  styles: [
  ]
})
export class LevelListComponent implements OnInit {


  levels: Level[] = [];

  constructor(private levelListService:LevelListService) {
  }

  ngOnInit(){
    this.levelListService.getAll().subscribe(res => this.levels = res);
  }

  selectLevel(level: Level) {
    this.levelListService.selectedLevel.next(level);
  }

}
