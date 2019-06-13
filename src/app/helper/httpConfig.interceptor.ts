import { Injectable } from '@angular/core';
import { HttpInterceptor , HttpRequest , HttpHandler , HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor{
    constructor() {}
    intercept(request: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>>{
        // if(request.body instanceof FormData){
        //     request = request.clone({
        //         setHeaders:{
        //             'Authorization': 'Basic YWRtaW46MTIzNA==',
        //         }
        //     });
        // }else{ admin 1234 auth
            request = request.clone({
                setHeaders:{
                    'Authorization': 'Basic YWRtaW46MTIzNA==',
                    // 'Content-Type' : 'application/json'
                }
            });
        // }
        return next.handle(request);
    }
}