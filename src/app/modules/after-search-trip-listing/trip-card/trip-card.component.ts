import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Encryption } from '../../../helper/encryption';
import { DataPassingService } from '../../../helper/dataPassingService';
import { Toaster } from '../../../helper/toaster';
import { BookNowModel } from '../../guide-information/book-now.model';
import { HttpCallService } from '../../../helper/httpCall.service';
import { apiUrl } from '../../../app.constants';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  baseImageUrl : string;
  isUserLogin  : Boolean = false;
  guideNumber  : string;
  tripName     : string;
  offset       : number = 0;
  page         : number = 8;
  tripListing  : Array <object>;
  disableSubmit       : boolean = false;
  guidePackageDetail  : Object;
  guideDetail         : object;
  showLoader          : boolean = false;
  
  @Input() data: Object;
  @Input() totalCount: number;
  @Output() loadMore = new EventEmitter();
  @Output() soloTripLoadMore = new EventEmitter();

  constructor(private router: Router
    , private dataPassingService: DataPassingService , private toastr: Toaster , private httpCall: HttpCallService) { }

  ngOnInit() {
    localStorage.setItem("$otherTripDateWise" , "false");
    this.baseImageUrl = environment.baseImageUrl;
    if(localStorage.getItem('$user')){
      this.isUserLogin = true;
      this.guideNumber = JSON.parse(localStorage.getItem('$user')).mobile;
    }
    this.dataPassingService.guideDetail.subscribe((res) => {
      this.isUserLogin = true;
      this.guideNumber = res['mobile'];
    });
    // this.loadTrips(this.offset , this.page);
  }
  navigate(tripDetailForOtherPackage , guideDetail?:any){
    if(tripDetailForOtherPackage==''){
      this.router.navigate(['/tour-guide' , guideDetail.web_url , guideDetail.place_url]);
    }else{ 
      if(localStorage.getItem("$otherTrips")){
        var _temp = JSON.parse(localStorage.getItem("$otherTrips"));

        _temp["guide_id"] = tripDetailForOtherPackage.guide_id;
        _temp["no_of_adults"] = tripDetailForOtherPackage.no_of_adults;
        _temp["no_of_children"] = tripDetailForOtherPackage.no_of_children;
        _temp["hire_date"]  = tripDetailForOtherPackage.tour_date;
        _temp["language_id"] = tripDetailForOtherPackage.language_id;
        _temp["city_id"] = tripDetailForOtherPackage.city_id;
        _temp["place_id"] = tripDetailForOtherPackage.place_id;
        _temp["package_type"] = tripDetailForOtherPackage.package_type;
      }else{
        var _temp = <any>{};

        _temp["guide_id"] = tripDetailForOtherPackage.guide_id;
        _temp["no_of_adults"] = tripDetailForOtherPackage.no_of_adults;
        _temp["no_of_children"] = tripDetailForOtherPackage.no_of_children;
        _temp["hire_date"]  = tripDetailForOtherPackage.tour_date;
        _temp["language_id"] = tripDetailForOtherPackage.language_id;
        _temp["city_id"] = tripDetailForOtherPackage.city_id;
        _temp["place_id"] = tripDetailForOtherPackage.place_id;
        _temp["package_type"] = tripDetailForOtherPackage.package_type;
      }

      localStorage.setItem("$otherTrips" , JSON.stringify(_temp));
      this.router.navigate(['trip-listing/other-packages']);
    }
  }
  loadMoreTrips() { 
    this.loadMore.emit();
    this.soloTripLoadMore.emit();
  }
  getNextDate(tourDate){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let cDate = new Date(tourDate);
    if(new Date(tourDate).toDateString() == new Date().toDateString()){
      // let nextDate = cDate.setDate(cDate.getDate()+1);
      let nextDate = cDate.setDate(cDate.getDate());
      let today = new Date(nextDate).getDate(); 
      let mm    = new Date(nextDate).getMonth(); 
      let yyyy  = new Date(nextDate).getFullYear();
      if (today < 10) {
        today = +'0' + today;
      }
      return  monthNames[mm] +' ' + today + ', ' + yyyy;
    }else{
      let nextDate = cDate.setDate(cDate.getDate());
      let today = new Date(nextDate).getDate(); 
      let mm    = new Date(nextDate).getMonth(); 
      let yyyy  = new Date(nextDate).getFullYear();
      if (today < 10) {
        today = +'0' + today;
      }
      return  monthNames[mm] +' ' + today + ', ' + yyyy;
    }
  }
  setTripDetail(data){ 
    this.guideDetail = data;
    this.tripName = data.tour_name;
  }
  requestNowTrip(data){
    this.showLoader    = true;
    this.disableSubmit = true;
    this.addOverLayClassInBody(this.showLoader);
    let _validate = this.validatePhoneNumber(data.mobile);
    if(_validate.isOkay){
      let obj = new BookNowModel(this.guideDetail['guide_id'] , JSON.parse(localStorage.getItem('$user')).user_id , 
      this.guideDetail['package_id'] , this.guideDetail['tour_date'] , this.guideDetail['no_of_adults']  , this.guideDetail['no_of_children']  , this.guideDetail['guide_charges'] , this.guideDetail['language_id'] , this.guideDetail['duration_hours'] ,
     '' , data.mobile , this.guideDetail['package_type']);
     this.httpCall.callApi('POST' , apiUrl.bookNowGuideDetail , obj).subscribe((res) => {
      if(res && res['body']){
        this.disableSubmit = false;
        this.showLoader    = false;
        this.addOverLayClassInBody(this.showLoader);
        if(res['body'].status == 1){
          document.getElementById('closeModelOnClick').click();
          localStorage.setItem('odigos_ty' , JSON.stringify(res['body'].message));
          this.router.navigate(['/tour-guide/'+ this.guideDetail['web_url'] + '/'+  this.guideDetail['place_url'] +'/thank-you']);
        }else{
          this.toastr.showWaring(res['body'].message);
        }
      }
     });
    }else{
      this.disableSubmit = false;
      this.showLoader    = false;
      this.addOverLayClassInBody(this.showLoader);
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
