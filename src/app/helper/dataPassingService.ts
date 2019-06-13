import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({'providedIn':'root'})
export class DataPassingService {
    guideDetail   = new Subject<Object>();
    paymentDetail = new Subject<Object>();
    constructor(){}
    public sendGuideDetail(data){
        this.guideDetail.next(data);
    }
    public sendPaymentDetail(data){
        this.paymentDetail.next(data);
    }
}