import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, count, Observable, retry, throwError} from "rxjs";
import {Category} from "../components/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {

  public selectedCategory = new BehaviorSubject<Category>(null);

  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'


  constructor(private http: HttpClient) {
  }


  getAll():Observable<Array<Category>>{
    return this.http.get<Array<Category>>(`${this.api}/categories`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(category:Category):Observable<any>{
    return this.http.post(`${this.api}/categories`, category)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(category:Category):Observable<any>{
    return this.http.put(`${this.api}/categories/${category.id}`, category)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any>{
    return this.http.delete(`${this.api}/categories/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }


  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }

}
