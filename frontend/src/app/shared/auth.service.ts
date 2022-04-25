import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {User} from "../components/user";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
//npm install --save-dev jwt-decode
interface Token {
  exp: number;
  user: {
    id: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string =
    "http://kwmgostudent.s1910456021.student.kwmhgb.at/api/auth";
  private _loginUrl = "http://kwmgostudent.s1910456021.student.kwmhgb.at/api/auth/login";
  private currentUserSubject: BehaviorSubject<User>;

  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router:Router) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  getUserData(user):Observable<any>{
    return this.http.post<any>(this._loginUrl, user)
      .pipe(map(userInfo => {
        localStorage.setItem('token', userInfo.token)
        this.currentUser = userInfo.user
        return userInfo.user
      }))
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }


  public setSessionStorage(token:string){
    console.log(jwtDecode(token));
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  logout(){
    this.http.post(`${this.api}/logout`, {    });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("logged out");
  }


  public isLoggedIn(){
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;

      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if(expirationDate < new Date()){
        console.info("token expired");
        sessionStorage.removeItem("token");
        return false;
      }
      else{
        return true;
      }
    }
    return false;
  }


  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

