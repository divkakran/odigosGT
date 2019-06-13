import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';

@Component({
  selector: 'app-booking-successful',
  templateUrl: './booking-successful.component.html',
  styleUrls: ['./booking-successful.component.css']
})
export class BookingSuccessfulComponent implements OnInit {

  baseImageUrl: string;
  b_id        : any;
  guideDetail : object;
  apiResponse : object;
  constructor(private activatedRoute: ActivatedRoute , private httpCall: HttpCallService) { }

  ngOnInit() {
    this.guideDetail = JSON.parse(localStorage.getItem('$user'));
    this.baseImageUrl = environment.baseImageUrl;
    this.activatedRoute.queryParams.subscribe(params => {
      if(!params['bookingId']){
        window.location.href = '';
      }else{
        this.b_id = params['bookingId'];
        this.loadBookingData();
      }  
    });
  } 
  loadBookingData(){
    let _temp = {booking_id: this.b_id , user_id: this.guideDetail['user_id']};
    this.httpCall.callApi('POST' , apiUrl.bookingStatus , _temp).subscribe(res => {
      if(res && res['body']){
        this.apiResponse = res['body'];
        let user = JSON.parse(localStorage.getItem('$user'));
        user.credit_points = res['body'].credit_points;
        localStorage.setItem('$user' , JSON.stringify(user));
      }
    }); 
  }

}
