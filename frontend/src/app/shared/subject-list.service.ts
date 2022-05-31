import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, count, Observable, retry, throwError} from "rxjs";
import {Subject} from "../components/subject";


@Injectable({
  providedIn: 'root'
})

export class SubjectListService {


  public selectedSubject = new BehaviorSubject<Subject>(null);
  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'


  constructor(private http: HttpClient) { }


  getAll(categoryId: number, levelId: number):Observable<Array<Subject>>{
    return this.http.get<Array<Subject>>(`${this.api}/subjects`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string):Observable<Array<Subject>>{
    return this.http.get<Subject>(`${this.api}/subjects/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Subject>{
    return this.http.get<Subject>(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  create(subject:Subject, userId: number):Observable<any>{
    const body = {
      "title": subject.title,
      "description": subject.description,
      "price": subject.price,
      "icon": "fa-solid fa-graduation-cap",
      "user_id": userId,
      "category_id": subject.category_id,
      "level_id": subject.level_id,
      "appointments": subject.appointments
    };

    return this.http.post(`${this.api}/subjects`, body)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(subject:Subject):Observable<any>{
    const body = {
      "title": subject.title,
      "description": subject.description,
      "price": subject.price,
      "icon": "fa-solid fa-graduation-cap",
      "category_id": subject.category_id,
      "level_id": subject.level_id,
      "appointments": subject.appointments
    };

    return this.http.put(`${this.api}/subjects/${subject.id}`, body)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any>{
    return this.http.delete(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  check(id:number):Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/subjects/checkId/${id}`)
      .pipe(catchError(this.errorHandler))
  }


  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }

}
