import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HttpCallService{
    constructor(private http: HttpClient){}
    callApi(type , url , body ){
        return this.http.request(new HttpRequest(
            type,
            url,
            body
        ));
    }
}