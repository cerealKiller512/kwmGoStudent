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
  @Input() showHeadline: boolean = true;
  @Input() buttonLabel: string = "Anmelden";

  loginForm: FormGroup;
  currentUser: User;

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    if(this.authService.isLoggedIn()){
      this.currentUser.id = this.authService.getCurrentUserId();
      this.user.emit(this.currentUser);
    }
  }


  login(){
    const val = this.loginForm.value;
    if(val.email && val.password){
      this.authService.login(val.email, val.password).subscribe((res:any) => {
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.currentUser.id = this.authService.getCurrentUserId();


        //TODO: check if user is teacher or student !
        this.user.emit(this.currentUser);
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

}
