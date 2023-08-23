import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { User } from '../models/User';

const apis_url = 'http://localhost:3000/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  constructor(private http : HttpClient) { }

  public register(data:User) : Observable <any>{
    return this.http.post<Observable<any>>(apis_url+'register',data)
  }

  public login(data:User) : Observable<any>{
    return this.http.post(apis_url+'login',data)
  }

  public logout() : Observable<any>{
    return this.http.post(apis_url+'logout',{})
  }
}
