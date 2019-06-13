import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable({ providedIn: 'root' })
export class Toaster{
    constructor( private toaster: ToastrManager ) {}
    showSucess(msg){
        this.toaster.successToastr( msg ,'',{ maxShown:1 , animate: null , toastTimeout:2000});
    }
    showWaring(msg){
        this.toaster.warningToastr( msg , '' ,{ maxShown:1 , animate: null , toastTimeout: 2000});
    }
}