import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataPassingService } from '../../../helper/dataPassingService';
import { Encryption } from '../../../helper/encryption';
@Component({
  selector: 'app-trip-detail-for-payment',
  templateUrl: './trip-detail-for-payment.component.html',
  styleUrls: ['./trip-detail-for-payment.component.css']
})
export class TripDetailForPaymentComponent implements OnInit {

  baseImageUrl  : String;
  paymentDetail : any;
  constructor(private shareData: DataPassingService , private encrypt: Encryption) { }

  ngOnInit() {
    this.baseImageUrl  = environment.baseImageUrl;
    this.paymentDetail = JSON.parse(localStorage.getItem('pdata'));
    console.log('-----' , this.paymentDetail);
    // setting up amount percent
    let _temp = JSON.parse(localStorage.getItem('pdata'));
    _temp['amountPay'] = 'full';
    localStorage.setItem('pdata' ,JSON.stringify(_temp));
    // setting up amount percent
  }
  getHoursFromTimeStamp(timeStamp){
    let _temp = parseInt(timeStamp);
    if (_temp > (60 * 60)) {
      return Math.round(_temp / (60 * 60)) + " hours";
    }else if(_temp > 60){
      return Math.round(_temp / (60)) + " min";
    }else{
      return Math.round(_temp) + " sec";
    }
  }
  amountPay(amount){
    let _temp = JSON.parse(localStorage.getItem('pdata'));
    _temp['amountPay'] = amount;
    localStorage.setItem('pdata' ,JSON.stringify(_temp));
  }

}
