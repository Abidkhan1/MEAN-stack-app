import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor(private authService: AuthServiceService, private router:Router){}

  public logout(){
    this.authService.logout().subscribe((res) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      this.router.navigate(['/']);
    });
  }
}
