import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Subject} from "../components/subject";
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'

  constructor(private http: HttpClient) { }
  getAll():Observable<Array<Subject>>{
    return this.http.get<Array<Subject>>(`${this.api}/mySubjects`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  setAppointmentsForUser(studentId: number, checkedAppointments: number[]){
    return this.http.put(`${this.api}/setAppointmentsForUser`, {
      "student_id": studentId,
      "appointments": checkedAppointments
    }).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }
}
