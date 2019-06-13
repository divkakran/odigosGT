import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
@Injectable()
export class RouteGuard implements CanActivate{
    constructor(private route: Router){}
    canActivate(){
        if(localStorage.getItem('$user')){
            return true;
        }else{
            this.route.navigate(['']);
            return false;
        }
    }
}