import { Component, OnInit } from '@angular/core';
import {Subject, User} from "../components/subject";
import {Category} from "../components/category";

@Component({
  selector: 'bs-category-list',
  templateUrl: './category-list.component.html',
  styles: [
  ]
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  ngOnInit(){

    this.categories.push(new Category(1, 'Mathematik'));
    this.categories.push(new Category(2, 'Deutsch'));
    this.categories.push(new Category(3, 'Englisch'));
    this.categories.push(new Category(4, 'Französisch'));
    this.categories.push(new Category(5, 'Spanisch'));
    this.categories.push(new Category(6, 'Italienisch'));
    this.categories.push(new Category(7, 'Latein'));
    this.categories.push(new Category(8, 'Informatik'));
    this.categories.push(new Category(9, 'Technik'));
    this.categories.push(new Category(10, 'Statistik'));
    this.categories.push(new Category(11, 'Recht'));
    this.categories.push(new Category(12, 'Wirtschaft'));
    this.categories.push(new Category(13, 'Rechnungswesen'));

    console.log(this.categories)
  }

}
