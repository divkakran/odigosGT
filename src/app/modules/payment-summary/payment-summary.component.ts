import { Component, OnInit } from '@angular/core';
import { Toaster } from '../../helper/toaster';
import { apiUrl } from '../../app.constants';
import { HttpCallService } from '../../helper/httpCall.service';
import { PaymentSummaryPayU } from './payment-summary.payuService';
import { environment } from '../../../environments/environment';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css'],
  providers: [PaymentSummaryPayU]
})
export class PaymentSummaryComponent implements OnInit {

  userDetail      : Object;
  payData         : Object;
  originalValues  : Object = {conveinceFee:'' , referalCodeBinding:''};
  // calculated variable
  amountDetail    : Object;
  conveinceDetail : Object
  packageRate     : any;
  convienceFee    : any;
  totalGst        : any;
  isCreditApply   : boolean = true;
  totalAmount     : any;
  lessAmountCredit: Number;
  creditPoints    : Number;
  isCouponApplied : boolean = false;
  balanceAmountToPaid : Number ;
  advanceAmountToPaid : Number ;
  couponTypeForPaymentData: any; 
  payUtesting         = environment.payULive;

  constructor(private pay: PaymentSummaryPayU , private httpCall : HttpCallService , private toaster: Toaster) { }

  ngOnInit() {
    this.updateCreditPoints(JSON.parse(localStorage.getItem('$user')));
    this.userDetail   = JSON.parse(localStorage.getItem('$user'));
    // this.creditPoints =  this.userDetail['credit_points'];
    this.payData      = JSON.parse(localStorage.getItem('pdata'));
    console.log('payment page' , this.userDetail);
    console.log('pay data' , this.payData);
    this.loadGstDetail();
  }
  loadGstDetail(){
    this.httpCall.callApi('POST' , apiUrl.gstDetail , {id: this.payData['id'] , user_id: this.userDetail['user_id']}).subscribe((res) => {
      if(res && res['body']){
        this.packageRate     = res['body']['amountDetails']['fee'];
        this.convienceFee    = res['body']['convenienceDetails']['fee'];
        this.amountDetail    = res['body']['amountDetails']; 
        this.conveinceDetail = res['body']['convenienceDetails']
        this.calculateAmount(this.amountDetail ,  this.conveinceDetail);
      }
    });
  }
  calculateAmount(amountDetail , conveinceDetail){ 
    if(amountDetail['cgst']== "0" && amountDetail['igst']== "0" && amountDetail['igst']== "0") {
      let _temp = +conveinceDetail['cgst'] + +conveinceDetail['igst'] + +conveinceDetail['sgst'];
      this.totalGst =  (+this.convienceFee * _temp)/100;
      this.totalAmount = +this.packageRate + +this.convienceFee + +this.totalGst - +this.disountValue;
      this.advanceAmountToPaid = (this.totalAmount * this.payData['advance_percent'])/100;
      this.balanceAmountToPaid = this.totalAmount-+this.advanceAmountToPaid;
    }else{
      let _temp = +amountDetail['cgst'] + +amountDetail['igst'] + +amountDetail['sgst'];
      this.totalGst =  ((+this.convienceFee+ +this.packageRate) * _temp)/100;
      this.totalAmount = +this.packageRate + +this.convienceFee + this.totalGst - +this.disountValue;
      this.advanceAmountToPaid = (this.totalAmount * this.payData['advance_percent'])/100;
      this.balanceAmountToPaid = this.totalAmount-+this.advanceAmountToPaid;
      console.log("-----" , this.advanceAmountToPaid)
    }
  }

  applyCredit(){
    switch(+this.conveinceDetail['fee'] <  +this.userDetail['credit_points']){
      case true : { 
        this.calculateCreditPoints(1);
        break;
      }
      case false : {
        this.calculateCreditPoints(0);
      }
    }
    
  }

  creditPointsForPayment: any;
  calculateCreditPoints(isCreditPointMoreThanConveinceFee){
    switch(isCreditPointMoreThanConveinceFee){ 
      case 1 : {
        if(this.isCreditApply){ 
          this.lessAmountCredit = this.conveinceDetail['fee'];
          this.creditPointsForPayment = this.conveinceDetail['fee'];
          this.convienceFee     = 0;
          this.isCreditApply    = false;
          this.creditPoints     = +this.creditPoints - +this.conveinceDetail['fee'];
          this.calculateAmount(this.amountDetail , this.conveinceDetail);
        } else {
          this.convienceFee  = this.conveinceDetail['fee'];
          this.isCreditApply = true;
          this.creditPoints  = this.userDetail['credit_points'];
          this.lessAmountCredit = 0;
          this.creditPointsForPayment='';
          this.calculateAmount(this.amountDetail , this.conveinceDetail);
        }
        break;
      }
      case 0: { 
        if(this.isCreditApply){ 
          this.convienceFee  = this.convienceFee - +this.userDetail['credit_points'];
          this.creditPointsForPayment = this.userDetail['credit_points'];
          this.isCreditApply = false;
          this.creditPoints  = 0 ;
          this.lessAmountCredit = this.convienceFee+ +this.userDetail['credit_points'];
          this.calculateAmount(this.amountDetail , this.conveinceDetail);
        } else {
          this.convienceFee  = +this.convienceFee + +this.userDetail['credit_points'];
          this.isCreditApply = true;
          this.creditPoints  = this.userDetail['credit_points'];
          this.lessAmountCredit = 0;
          this.creditPointsForPayment = '';
          this.calculateAmount(this.amountDetail , this.conveinceDetail);
        }
      }
    }
  }
  couponValueForPayment: any;
  applyCoupon(){
    let obj = {referral_code: this.originalValues['referalCodeBinding'] , user_id: this.userDetail['user_id'] , cart_amount: this.totalAmount};
    this.httpCall.callApi('POST' , apiUrl.applyCoupon , obj).subscribe((res) => {
      if(res && res['body']){
        if(this.totalAmount < res['body']['min_cart_value'] || res['body']['status']=="0"){
          this.toaster.showWaring("Can not apply coupon");
        }else{
          let couponType = res['body']['credit_points'];
          switch(couponType=="0"){
            case true: {
              this.calculateCouponAmount(res['body'] , "coupon");
              this.couponValueForPayment = res['body'].discount_value;
              break;
            }
            case false: {
              this.calculateCouponAmount(res['body'] , "referral");
              this.couponValueForPayment = res['body'].discount_value;
              break;
            }
          }
        }
      }
    });
  }
  // typeofCoupon == refrral or coupon
  disountValue: Number = 0;
  calculateCouponAmount(data , typeOfCoupon){
    switch(typeOfCoupon) {
      case "coupon": {
        switch(data.coupon_type){
          case "PERCENTAGE": {
            if(this.packageRate*data.discount_value/100 > data.discount_upto){
              this.disountValue = data.discount_upto;
              this.calculateAmount(this.amountDetail , this.conveinceDetail);
            }else{
              this.disountValue = this.packageRate*data.discount_value/100;
              this.calculateAmount(this.amountDetail , this.conveinceDetail);
            }
            this.couponTypeForPaymentData = "PERCENTAGE";
            break;
          }
          case "FLAT": {
            this.disountValue = data.discount_value;
            this.calculateAmount(this.amountDetail , this.conveinceDetail);
            this.couponTypeForPaymentData = "FLAT";
            break;
          }
        }
        break;
      }
      case "referral": {
        this.couponTypeForPaymentData = "";
        if(this.packageRate < data.credit_points){
          this.disountValue = this.packageRate;
        }else{
          this.disountValue = data.credit_points;
        }
        this.calculateAmount(this.amountDetail , this.conveinceDetail);
        break;
      }
    }
    this.isCouponApplied = true;
  }
  cancelCoupon(){
    this.disountValue = 0;
    this.isCouponApplied = false;
    this.originalValues['referalCodeBinding'] = '';
    // for payment gateway
    this.couponTypeForPaymentData = "";
    this.couponValueForPayment = '';
    this.calculateAmount(this.amountDetail , this.conveinceDetail)
  }

  payUDataSubmit(){
    let c_timestamp = Date.now();
    // udf1Format = {user_id: this.userDetail['user_id'] , id: this.payData['id'] , advance_percent: this.payData['advance_percent'] , vendor_token :''};
    let udf1        = this.userDetail['user_id'] +"#"+ this.payData['id'] +"#"+ this.payData['advance_percent']+"#"+'';

    // udf2Format = {booking_amount: this.payData['guide_charges'] , payable_amount: this.totalAmount , payment_type:'' , timestamp: Date.now()};
    if(this.payData['amountPay'] == 'full'){
      var udf2        = this.payData['guide_charges']+"#"+this.totalAmount +"#"+ 100 +"#"+Date.now();
    }else{
      var udf2        = this.payData['guide_charges']+"#"+this.totalAmount +"#"+ this.payData['advance_percent'] +"#"+Date.now();
    }
    // udf3Format   = JSON.stringify({due_amount:'' , paid_amount:'' , sgst: this.conveinceDetail['sgst'] , cgst: this.conveinceDetail['cgst'] , igst: this.conveinceDetail['igst']});
    if(this.payData['amountPay'] == 'full'){
      var udf3        = 0 +"#"+ this.totalAmount +"#"+ this.conveinceDetail['sgst'] +"#"+ this.conveinceDetail['cgst'] +"#"+ this.conveinceDetail['igst'];
    }else{
      var udf3        = this.balanceAmountToPaid +"#"+ this.advanceAmountToPaid +"#"+ this.conveinceDetail['sgst'] +"#"+ this.conveinceDetail['cgst'] +"#"+ this.conveinceDetail['igst'];
    }

     // let udf4     = this.originalValues['referalCodeBinding'] +"#"+ this.couponTypeForPaymentData +"#"+ this.disountValue +"#"+ this.creditPointsForPayment +"#"+ this.lessAmountCredit +"#"+ this.conveinceDetail['fee'];
    // udf4Format   = {coupon_code:'' , coupon_type:'' , coupon_value:'' , discount:'' , credits:'' , convience_fee:'];
    let udf4        = this.originalValues['referalCodeBinding'] +"#"+ this.couponTypeForPaymentData +"#"+this.couponValueForPayment+'#'+ this.disountValue +"#"+ this.creditPointsForPayment +"#" + "#"+ this.conveinceDetail['fee'];

    if(this.payData['amountPay'] == 'full'){
      let _temp =  {key : "BxB839" , txnid : c_timestamp  , amount : this.totalAmount , productinfo : "trip amount" , 
      firstname  : this.userDetail["name"] , email : this.userDetail["email"] , phone : this.userDetail["mobile"] , udf1: udf1 , udf2: udf2 , udf3: udf3 , udf4: udf4,
      Lastname : "" , surl : environment.paySuccess, furl : environment.furl , 
      hash : this.calculateHash(c_timestamp, udf1 , udf2 , udf3 , udf4 , this.totalAmount)};
      this.pay.post(_temp,this.payUtesting);
    }else{
      let _temp =  {key : "BxB839" , txnid : c_timestamp  , amount : this.advanceAmountToPaid , productinfo : "trip amount" , 
      firstname  : this.userDetail["name"] , email : this.userDetail["email"] , phone : this.userDetail["mobile"] , udf1: udf1 , udf2: udf2 , udf3: udf3 , udf4: udf4,
      Lastname : "" , surl : environment.paySuccess , furl : environment.furl , 
      hash : this.calculateHash(c_timestamp, udf1 , udf2 , udf3 , udf4 , this.advanceAmountToPaid)};
      this.pay.post(_temp,this.payUtesting);
    }
  }
  calculateHash(timeStamp , udf1 , udf2 , udf3 , udf4 , amount){
    let _temp = sha512.sha512("BxB839|"+timeStamp+"|"+amount+"|trip amount|"+this.userDetail["name"]+"|"+this.userDetail["email"]+"|"+udf1+"|"+udf2+"|"+udf3+"|"+udf4+"|||||||27pqwWRV");
    return _temp;
  }

  // updateCredit
  updateCreditPoints(user){
    this.httpCall.callApi('POST' , apiUrl.getCreditPoints , {user_id: user['user_id']}).subscribe((res)=> {
      if(res && res['body']){
        this.userDetail   = JSON.parse(localStorage.getItem('$user'));
        this.userDetail['credit_points'] = res['body'].credit_points
        localStorage.setItem('$user' , JSON.stringify(this.userDetail));
        this.creditPoints =  res['body']['credit_points'];
        console.log("inside credit" , res['body']);
      }
    });
  }

}
