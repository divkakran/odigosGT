import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpCallService } from '../../../helper/httpCall.service';
import { apiUrl } from '../../../app.constants';
import { Encryption } from '../../../helper/encryption';
import { Router } from '@angular/router';
import { RequestStatusTrips } from '../../../helper/requestStatusTrips';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  baseImageUrl             : String;
  loadAPI                  : Promise<any>;
  viewDetailLoad           : Boolean = false;
  userDetail               : object;
  tripType                 : any;
  viewDetail               : object = {tripList: '', tripType: ''};
  cancelTrip               : boolean = false;
  ratingNumber             : Number = 0;
  tripId                   : String;
  setButtonDisable         : Boolean = false;
  openTripDetailForPayment : boolean = false

  @Input() tripDetail: Object;
  @Output() cancelTrips = new EventEmitter<Object>();
  
  constructor(private httpCall: HttpCallService , private encrypt: Encryption , private route: Router ) { }

  ngOnInit() { 
    this.baseImageUrl = environment.baseImageUrl;
    this.userDetail   = JSON.parse(localStorage.getItem('$user'));
  }
  tripTypeChange(type){
    this.tripDetail['type'] = type;
    switch(type){
      case 'Pending Trips':{
        this.tripType = 'PENDING';
        break;
      }
      case 'Upcoming Trips':{
        this.tripType = 'UPCOMING';
        break;
      }
      case 'Past Trips':{
        this.tripType = 'PAST';
        break;
      }
      case 'Cancelled Trips':{
        this.tripType = 'CANCELLED';
      }
    }
  }
  openViewDetail(id , bId ){ 
    this.tripTypeChange(this.tripDetail['type']);
    let obj = {user_id: this.userDetail['user_id'] , id: id , trip_type: this.tripType , booking_id:bId};
    this.httpCall.callApi('POST', apiUrl.tripDetail , obj).subscribe((res) => {
      if(res && res['body']){
        this.viewDetail['tripList']  = res['body'].tripDetails;
        this.viewDetail['tripType']  = this.tripType;
        this.viewDetailLoad = true;
      }
    });
  }
  tripDetailForCancel: any;
  cancelTripMethod(tripDetail , test?){ 
    this.tripDetailForCancel = tripDetail;
    if(test=='1'){
      switch(this.tripDetail['type']){
        case 'Pending Trips' : {
          this.httpCall.callApi('POST' , apiUrl.pendingTripCancel , {user_id: this.userDetail['user_id'] , id: this.tripDetailForCancel.id , guide_id: this.tripDetailForCancel.guide_id}).subscribe((res) => {
            if(res && res['body'] && res['body'].status=='1'){
              this.cancelTrips.emit();
            }
          });
        }
        case 'Upcoming Trips' : {
          this.httpCall.callApi('POST' , apiUrl.upcomingTripCncel , {user_id: this.userDetail['user_id'] , id: tripDetail.id }).subscribe((res) => {
            if(res && res['body'] && res['body'].status=='1'){
              this.cancelTrips.emit();
            }
          });
        }
      }
    }
  }
  cancelBy(status , actionBy){ 
    return new RequestStatusTrips().getStatus(status , actionBy);
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
  rateMePopUp(rate){
    this.ratingNumber = rate;
  }
  getTripIdForRating(id){ 
    this.tripId = id
  }
  callRateMeApi(){
    this.setButtonDisable = true;
    this.httpCall.callApi('POST' , apiUrl.tripRating , {user_id:this.userDetail['user_id'] ,id: this.tripId , trip_rating: this.ratingNumber}).subscribe((res) => {
      if(res && res['body'] && res['body'].status ==1){
        this.setButtonDisable = false;
        document.getElementById('popUp').click();
        this.cancelTrips.emit();
      }
    })
  }
  sendDataToPaymentPage(data){ 
    if(data.request_status=='1'){
      localStorage.setItem('pdata' , JSON.stringify(data));
      this.route.navigate(['/my-trips/payment'])
    }
  }
  sendMessage(id){
    let _temp = JSON.parse(localStorage.getItem('$user'));
    _temp.guideIdForMsg = id;
    localStorage.setItem('$user' , JSON.stringify(_temp)); 
    window.location.href = '/inbox';
  }

}
