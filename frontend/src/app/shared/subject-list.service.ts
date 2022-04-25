import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, count, Observable, retry, throwError} from "rxjs";
import {Subject} from "../components/subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectListService {

  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'


  constructor(private http: HttpClient) {
  }


  getAll():Observable<Array<Subject>>{
    return this.http.get<Array<Subject>>(`${this.api}/subjects`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Subject>{
    return this.http.get<Subject>(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  create(subject:Subject):Observable<any>{
    return this.http.post(`${this.api}/subjects`, subject)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(subject:Subject):Observable<any>{
    return this.http.put(`${this.api}/subjects/${subject.id}`, subject)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any>{
    return this.http.delete(`${this.api}/subjects/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }


  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }

}
