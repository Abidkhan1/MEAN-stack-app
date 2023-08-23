import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("accessToken");
        if (request.body instanceof FormData) {
            const authReq = request.clone({
              headers: request.headers.set("Authorization", `Token ${token}`)
            });
            return next.handle(authReq);
          }
          else if (token) {
            const authReq = request.clone({
              headers: request.headers.set('Content-Type', 'application/json').set("Authorization", `Token ${token}`)
            });
            return next.handle(authReq);
          }
          else {
            const authReq = request.clone({
              headers: request.headers.set('Content-Type', 'application/json')
            });
            return next.handle(authReq);
          }
    }
}