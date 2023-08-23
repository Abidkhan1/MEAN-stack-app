import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public form = {
    fullName : '',
    email: '',
    password: '',
    role : 'admin'
  }

  constructor(private authService: AuthServiceService){}

  public registerUser(){
    console.log('register user called', this.form);
    this.authService.register(this.form).subscribe((response) => {
      console.log('response',response);
      
    })
  }
}
