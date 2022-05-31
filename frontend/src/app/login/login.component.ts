import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService, Response} from "../shared/auth.service";
import {User} from "../components/user";

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  @Output() user = new EventEmitter<User>();

  @Input() buttonLabel: string = "Anmelden";

  loginForm: FormGroup;
  currentUser: User;
  isLoggedIn: boolean = false;

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.authService.isLoggedInSubject.subscribe(loginState => this.isLoggedIn = loginState)

    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    if(this.authService.validateLoginStateByToken()){
      this.currentUser = this.authService.getCurrentUser();
      this.user.emit(this.currentUser);
    }
  }


  login(loginType: "teacher" | "student"){
    const val = this.loginForm.value;
    if(val.email && val.password){
        this.authService.login(loginType, val.email, val.password).subscribe((res:any) => {
          this.authService.setSessionStorage((res as Response).access_token);
          this.authService.validateLoginStateByToken();
          this.router.navigateByUrl("/");
        });
    }

  }

  logout(){
    this.authService.logout();
  }

  onLogout(){
    this.authService.logout();
  }

}
