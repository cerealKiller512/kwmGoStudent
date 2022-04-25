import { Component, OnInit } from '@angular/core';
import {Category} from "../components/category";
import {Level} from "../components/level";

@Component({
  selector: 'bs-level-list',
  templateUrl: './level-list.component.html',
  styles: [
  ]
})
export class LevelListComponent implements OnInit {


  levels: Level[] = [];

  ngOnInit(){

    this.levels.push(new Level(1, 'Volksschule'));
    this.levels.push(new Level(2, 'Unterstufe'));
    this.levels.push(new Level(3, 'Oberstufe'));
    this.levels.push(new Level(4, 'Studium'));

    console.log(this.levels)
  }

}
