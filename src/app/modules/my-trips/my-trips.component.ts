import { Component, OnInit , ViewChild , AfterViewInit } from '@angular/core';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { Encryption } from '../../helper/encryption';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit  {

  // load more set variable
  page   : number = 6;
  offset : number = 0;
  // load more set variable
  tripDetail : object = {type: "Pending Trips" , tripList: [] , page: this.page , offset:this.offset , totalRecords: ''};
  totalRecord: String;
  userDetail : Object;
  constructor(private httpCall: HttpCallService , private encrypt: Encryption) { }

  ngOnInit() {
    let userDetail  = localStorage.getItem('$user');
    this.userDetail = JSON.parse(userDetail);
    this.loadTrips('PENDING');
  }
  tripTypeChange(type){
    this.offset = 0;
    this.tripDetail['type'] = type;
    switch(type){
      case 'Pending Trips':{
        this.loadTrips('PENDING');
        break;
      }
      case 'Upcoming Trips':{
        this.loadTrips('UPCOMING');
        break;
      }
      case 'Past Trips':{
        this.loadTrips('PAST');
        break;
      }
      case 'Cancelled Trips':{
        this.loadTrips('CANCELLED');
      }
    }
  }
  loadTrips(type){
    this.httpCall.callApi('POST',apiUrl.myTrips , 
    {"user_id":this.userDetail['user_id'] ,"trip_type": type , "page": this.page , "offset": this.offset}).subscribe((res) => {
      if(res && res['body']){
        this.tripDetail['totalRecords'] = res['body'].total_count
        if(this.offset == 0){
          this.tripDetail['tripList']     = res['body'].trips;
        }else{
          for(let item of (res['body'].trips)){
            this.tripDetail['tripList'].push(item);
          }
        }
      }
    });
  }
  loadTripOnCancel(){ 
    this.tripTypeChange(this.tripDetail['type']);
  }
  loadMoreTrips(){
    this.offset += 1;
    switch(this.tripDetail['type']){
      case 'Pending Trips':{
        this.loadTrips('PENDING');
        break;
      }
      case 'Upcoming Trips':{
        this.loadTrips('UPCOMING');
        break;
      }
      case 'Past Trips':{
        this.loadTrips('PAST');
        break;
      }
      case 'Cancelled Trips':{
        this.loadTrips('CANCELLED');
      }
    }
  }

}
