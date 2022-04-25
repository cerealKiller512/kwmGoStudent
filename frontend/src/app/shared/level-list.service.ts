import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, count, Observable, retry, throwError} from "rxjs";
import {Category} from "../components/category";
import {Level} from "../components/level";

@Injectable({
  providedIn: 'root'
})
export class LevelListService {
  public selectedLevel = new BehaviorSubject<Level>(null);
  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'


  constructor(private http: HttpClient) {
  }


  getAll():Observable<Array<Level>>{
    return this.http.get<Array<Level>>(`${this.api}/levels`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(level:Level):Observable<any>{
    return this.http.post(`${this.api}/levels`, level)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(level:Level):Observable<any>{
    return this.http.put(`${this.api}/levels/${level.id}`, level)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any>{
    return this.http.delete(`${this.api}/levels/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }


  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }

}
