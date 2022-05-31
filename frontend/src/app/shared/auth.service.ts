import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {User} from "../components/user";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Student} from "../components/student";

export interface Response{
  access_token: string
}

interface Token {
  exp: number;
  user: {
    isTeacher:boolean,
    id: string,
    email: string,
    firstName: string,
    lastName:string,
    phone?:string,
    image_url?:string
  }

  student: {
    isTeacher:boolean,
    id: string,
    email: string,
    firstName: string,
    lastName:string,
    phone?:string,
    image_url?: string
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string =
    "http://kwmgostudent.s1910456021.student.kwmhgb.at/api/auth";

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedInAsTeacher = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(loginType: "teacher" | "student", email: string, password: string) {
    return this.http.post(loginType === "teacher" ? `${this.api}/login` : `${this.api}/login/student`, {
      'email': email,
      'password': password
    })
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public setSessionStorage(token:string){
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user ? decodedToken.user.id : decodedToken.student.id);
  }

  /**
   * returns either a User (Teacher) or a Student, depends on the received token
   * @returns User | Student
   */
  decodeToken(): User | Student {
    if(sessionStorage.getItem("token")){
      const decodedToken = jwtDecode(sessionStorage.getItem("token")) as Token;

      if (decodedToken.user) {
        this.isLoggedInAsTeacher.next(decodedToken.user.isTeacher)
        return new User(+decodedToken.user.id,
          decodedToken.user.firstName, decodedToken.user.lastName,
          decodedToken.user.email,decodedToken.user.image_url);
      } else if (decodedToken.student) {
        this.isLoggedInAsTeacher.next(decodedToken.student.isTeacher)
        return new Student(+decodedToken.student.id,
          decodedToken.student.firstName, decodedToken.student.lastName,
          decodedToken.student.email,decodedToken.student.image_url);
      } else {
        console.error("Neither a teacher nor a student included in claims.");
         return null;
      }
    }
    else{
      return null;
    }
  }

  public validateLoginStateByToken(){
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;

      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if(expirationDate < new Date()){
        console.info("token expired");
        sessionStorage.removeItem("token");
        this.isLoggedInSubject.next(false);
        return false;
      }
      else{
        console.log("access")
        if (decodedToken.user) this.isLoggedInAsTeacher.next(true)
        else this.isLoggedInAsTeacher.next(false);
        this.isLoggedInSubject.next(true);
        return true;
      }
    }
    console.log("no token")
    this.isLoggedInSubject.next(false);
    return false;
  }

  getCurrentUser(): User | Student {
    return this.decodeToken();
  }

  public isUser(user:User):boolean{
    if(this.validateLoginStateByToken() && this.isUser(user)){
      return true
    }
    return false;
  }

  logout(){
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    this.isLoggedInSubject.next(false);
    console.log("logged out");
  }

}

