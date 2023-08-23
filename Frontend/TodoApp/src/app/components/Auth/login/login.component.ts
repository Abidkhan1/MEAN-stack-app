import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  public form = {
    email : '',
    password: ''
  }

  constructor(private authService:AuthServiceService, private router:Router){}

  public loginUser(){
    console.log('login here');
    this.authService.login(this.form).subscribe((response) => {
      localStorage.setItem('user',response.user);
      localStorage.setItem('accessToken',response.accessToken)
      console.log('login response', response);
      if (response.user.role == 'admin') {
        this.router.navigate(["admin/home"]);
      }else{
        this.router.navigate(["client/home"]);
      }
      //also set accessToken in interceptor for authenticated APIs
      
    })
  }
}
