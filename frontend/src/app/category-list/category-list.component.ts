import { Component, OnInit } from '@angular/core';
import {Subject, User} from "../components/subject";
import {Category} from "../components/category";
import {CategoryListService} from "../shared/category-list.service";

@Component({
  selector: 'bs-category-list',
  templateUrl: './category-list.component.html',
  styles: [
  ]
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryListService:CategoryListService) {
  }

  ngOnInit(){

    this.categoryListService.getAll().subscribe(res => this.categories = res);

  }

  selectCategory(category: Category): void {
    this.categoryListService.selectedCategory.next(category);
  }

}
