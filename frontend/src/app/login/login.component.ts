import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {User} from "../components/user";

interface Response{
  access_token:string;
}

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

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    console.log("..... login component")
    console.log(this.authService.isLoggedIn())
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    if(this.authService.isLoggedIn()){
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser)
      this.user.emit(this.currentUser);
    }
  }


  login(loginType: "teacher" | "student"){
    const val = this.loginForm.value;
    if(val.email && val.password){
        this.authService.login(loginType, val.email, val.password).subscribe((res:any) => {
          console.log(res);
          this.authService.setSessionStorage((res as Response).access_token);
          this.router.navigateByUrl("/");
        });
    }

  }



  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

  onLogout(){
    this.authService.logout();
  }




}
