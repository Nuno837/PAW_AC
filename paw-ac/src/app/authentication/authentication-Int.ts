import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const atoken = this.authenticationService.getToken();
        const arequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + atoken)
        });
        return next.handle(arequest);
    }
}
