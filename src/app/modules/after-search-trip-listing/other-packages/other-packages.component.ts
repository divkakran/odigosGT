import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpCallService } from '../../../helper/httpCall.service';
import { Router } from '@angular/router';
import { apiUrl } from '../../../app.constants';
import { Toaster } from '../../../helper/toaster';
import { BookNowModel } from '../../guide-information/book-now.model';
import { DataPassingService } from '../../../helper/dataPassingService';

@Component({
  selector: 'app-other-packages',
  templateUrl: './other-packages.component.html',
  styleUrls: ['./other-packages.component.css']
})
export class OtherPackagesComponent implements OnInit {

  baseImageUrl  : string;
  guideDetail   : any;
  guideInfo     : object;
  guidePackages : object;
  isUserLogin   : boolean = false;
  guideNumber   : number;
  tripName      : string;
  totalCount    : number;
  offset        : number = 0;
  page          : number = 8;
  disableSubmit : boolean = false;
  showLoader    : boolean = false;
  tripDetailForBooking : object;
  constructor(private httpCall: HttpCallService , private router: Router ,
    private toastr: Toaster , private dataPassingService: DataPassingService ,) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    if(localStorage.getItem('$user')){
      this.isUserLogin = true;
      this.guideNumber = JSON.parse(localStorage.getItem('$user')).mobile;
    }
    this.guideDetail  = JSON.parse(localStorage.getItem("$otherTrips"));
    this.loadOtherPackages(this.offset , this.page);
    // setting user login
    this.dataPassingService.guideDetail.subscribe((res) => {
      this.isUserLogin  = true;
      this.guideNumber  = res['mobile'];
    });
  }

  loadOtherPackages(offset , page){
    this.guideDetail["offset"] = offset ; 
    this.guideDetail["page"]   = page;
    this.httpCall.callApi('POST' , apiUrl.hireMoreGuide , this.guideDetail).subscribe((res) => {
      if(res && res['body']){
        this.guideInfo = res['body'].guideDetails;
        this.guidePackages = res["body"].guidePackages;
        this.totalCount    = res["body"].totalCount;
      }
    })
  }
  getNextDate(){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let cDate = new Date();
    let nextDate = cDate.setDate(cDate.getDate()+1);
    let today = new Date(nextDate).getDate(); 
    let mm    = new Date(nextDate).getMonth(); 
    let yyyy  = new Date(nextDate).getFullYear();
    if (today < 10) {
      today = +'0' + today;
    }
    return  monthNames[mm] +' ' + today + ', ' + yyyy;
  }
  setTripDetail(data){ 
    this.tripName = data.tour_name;
    this.tripDetailForBooking = data;
    console.log("hello dude" , this.tripDetailForBooking);
  }
  navigate(guideDetail){
    this.router.navigate(['/tour-guide' , guideDetail.web_url , guideDetail.place_url]);
  }
  loadMoreTrips(){
    this.page = 8+ this.page;
    this.loadOtherPackages(this.offset , this.page);
  }
  requestNowTrip(data){
    this.showLoader    = true;
    this.addOverLayClassInBody(this.showLoader);
    this.disableSubmit = true;
    let _validate = this.validatePhoneNumber(data.mobile);
    if(_validate.isOkay){ 
      let obj = new BookNowModel(this.tripDetailForBooking['guide_id'] , JSON.parse(localStorage.getItem('$user')).user_id , 
      this.tripDetailForBooking['package_id'] , this.tripDetailForBooking['tour_date'] , this.tripDetailForBooking['no_of_adults']  , this.tripDetailForBooking['no_of_children']  , this.tripDetailForBooking['guide_charges'] , this.tripDetailForBooking['language_id'] , this.tripDetailForBooking['duration_hours'] ,
     '' , data.mobile , this.tripDetailForBooking['package_type']);
     this.httpCall.callApi('POST' , apiUrl.bookNowGuideDetail , obj).subscribe((res) => {
      if(res && res['body']){
        this.disableSubmit = false;
        if(res['body'].status == 1){
          this.showLoader    = false;
          this.addOverLayClassInBody(this.showLoader);
          document.getElementById('closeModelOnClick').click();
          localStorage.setItem('odigos_ty' , JSON.stringify(res['body'].message));
          this.router.navigate(['/tour-guide/'+ this.tripDetailForBooking['web_url'] + '/'+  this.tripDetailForBooking['place_url'] +'/thank-you']);
        }else{
          this.toastr.showWaring(res['body'].message);
          this.showLoader    = false;
        }
      }
     });
    }else{
      this.showLoader    = false;
      this.addOverLayClassInBody(this.showLoader);
      this.disableSubmit = false;
      this.toastr.showWaring(_validate.msg);
    }
  }
  validatePhoneNumber(mobile){
    let _temp = { isOkay : false , msg:'' };
    if(mobile == ''){
      _temp.msg = "Mobile Num is required";
      return _temp;
    }else if(mobile.length < 10){
      _temp.msg = "Mobile Num is't valid";
      return _temp;
    }else{
      _temp.isOkay = true;
      return _temp;
    }
  }
  addOverLayClassInBody(showLoader){
    if(showLoader){
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("loader-overlay");   //add the class
      // var element = document.createElement("div");
      // element.setAttribute("class", 'overlay');
      // document.body.appendChild(element);
    }else{
      let c = document.querySelector('.loader-overlay');
      c.classList.remove('loader-overlay');
      // let backdrop = document.querySelector('.backdrop');
      // backdrop.classList.remove('backdrop');
    }
  }
  setActualTripDate(date){
    localStorage.setItem("$trip_date" , date)
  }

}
