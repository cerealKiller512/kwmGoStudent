import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, retry, throwError} from "rxjs";
import {Level} from "../components/level";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../components/appointment";
import {Subject} from "../components/subject";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public selectedAppointment = new BehaviorSubject<Level>(null);
  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'

  constructor(private http: HttpClient) {

  }

  getAll():Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/appointments/`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  getAppointmentsByStudentId(id:number):Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/studentAppointments/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  getBooked(){
    return this.http.get<Array<Appointment>>(`${this.api}/bookedAppointments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getBookedById(id:number):Observable<Array<Appointment>>{
    return this.http.get<Array<Appointment>>(`${this.api}/bookedAppointments/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  update(appointment:Appointment):Observable<any>{
    localStorage.setItem('appointment', JSON.stringify(appointment));
    return this.http.put(`${this.api}/bookedAppointments/${appointment.id}`, appointment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }
}
