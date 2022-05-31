import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, count, Observable, retry, throwError} from "rxjs";
import {Subject, User} from "../components/subject";


@Injectable({
  providedIn: 'root'
})

export class ProfileService{
  private api = 'http://kwmgostudent.s1910456021.student.kwmhgb.at/api'

  constructor(private http: HttpClient) { }

  getAll():Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string):Observable<Array<User>>{
    return this.http.get<User>(`${this.api}/users/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<User>{
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  create(user:User):Observable<any>{
    const body = {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "phone": user.phone,
      "image_url": user.image_url,
      "education": user.education,
      "description": user.description,
    };
    return this.http.post(`${this.api}/users`, body)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  validatePw(password: string, id: number):Observable<any> {
    const body = {
      "id": id,
      "password": password
    }
    return this.http.post(`${this.api}/validatePw`, body)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(user:User):Observable<any>{
    const body = {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
    };

    return this.http.put(`${this.api}/users/${user.id}`, body)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any>{
    return this.http.delete(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  check(id:number):Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/users/checkId/${id}`)
      .pipe(catchError(this.errorHandler))
  }

  private errorHandler(error:Error | any): Observable<any>{
    return throwError(error)

  }
}
