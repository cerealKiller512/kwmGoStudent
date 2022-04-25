import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./shared/auth.service";
@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()){
      return true
    } else {
      window.alert("Sie müssen sich einloggen, um den Admin Bereich nutzen zu können!")
      this.router.navigate(["../"],{relativeTo: this.route});
      return false;
    }
  }
}
