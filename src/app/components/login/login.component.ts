import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  returnedJWT: object = {};
  token: string = '';

  constructor(private loginAuth: LoginService) { 

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
   
    this.loginAuth.authUser(this.username, this.password).subscribe(res => {
   
      this.returnedJWT = res;
    }
    );

   
    setTimeout( () => {
    console.log('this is the token?',this.returnedJWT);
    }, 400);
  }
  // getToken(jwtObject: object) {
  //   this.token = jwtObject.token;
  // }

}