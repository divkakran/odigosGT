import { Component, OnInit , Input , OnChanges } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { apiUrl } from '../../../app.constants';
import { HttpCallService } from '../../../helper/httpCall.service';
import { Encryption } from '../../../helper/encryption';

@Component({
  selector: 'app-category-trips',
  templateUrl: './category-trips.component.html',
  styleUrls: ['./category-trips.component.css']
})
export class CategoryTripsComponent implements OnInit , OnChanges{

  baseImageUrl : String;
  tourList     : Array<string>;
  defaultLang  : string;
  @Input() placeName: any;
  @Input() comboSearch : any;
  @Input() numOfVisitors : any;
  constructor(private httpCall : HttpCallService , private ac: ActivatedRoute,
    private router: Router , private encrypt: Encryption) { 
    this.baseImageUrl = environment.baseImageUrl;
  }x

  ngOnInit() {
    this.ac.queryParams.subscribe(params => { 
      this.placeName = params['destination'];
      this.placeName = this.placeName.replace(/-/g, " ");
      this.loadCategoryTrips();
    });
    this.loadCategoryTrips();
  }

  ngOnChanges(){
    this.tourList = this.comboSearch;
    // added new
    if(this.numOfVisitors){
      this.no_of_adults = this.numOfVisitors.no_of_adults;
      this.no_of_children = this.numOfVisitors.no_of_children;
      this.hire_date      = this.numOfVisitors.hire_date;
    }
  }

  // setting data for see all trips
  no_of_adults: any;
  no_of_children : any;
  hire_date      : any;
  // end
  object: object;
  loadCategoryTrips(){
    if(this.comboSearch){
      this.tourList = this.comboSearch['list'];
    }else{
      if(localStorage.getItem('$otherTrips') && localStorage.getItem('$otherTripDateWise')=="true"){ 
        let obj = JSON.parse(localStorage.getItem('$otherTrips'))
        this.object = {'city_id':obj.city_id , 'place_id':'' , 'language_id':obj.language_id , 
        'hire_date':obj.hire_date , 'no_of_adults':obj.no_of_adults , 'no_of_children': obj.no_of_children , 'offset':0 ,'page':5};
      }else {
        this.object = {'city_id':"","language_id": localStorage.getItem('defaultLang'), 'keyword':this.placeName,
        'hire_date': this.setDate(),'no_of_adults':"1",'no_of_children':"0",'offset':0,'page':5}
      }
      this.httpCall.callApi('POST' , apiUrl.categoryTourList , this.object).subscribe((res) => {
        if(res && res['body']){
          this.tourList = res['body'].list;
          this.no_of_adults = res['body'].no_of_adults;
          this.no_of_children = res['body'].no_of_children;
          this.hire_date      = res['body'].hire_date;
        }
      });
    }
  }
  setDate(){
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
  seeAll(data){
    data.placeName = this.placeName;
    data.no_of_adults = this.no_of_adults;
    data.no_of_children = this.no_of_children
    data.hire_date      =  this.hire_date;

    localStorage.setItem('$datatype' , JSON.stringify(data));
    // console.log("see all data" , data);
    this.router.navigate(['trip-listing/see-all'] , {queryParams: {destination:data.placeName , cat_id:  data.cat_id , cat_name: data.cat_name, offset: '9' , page: '0'
    , keyword: data.placeName , no_of_adults: data.no_of_adults , no_of_children: data.no_of_children , hire_date: data.hire_date}});

    // this.router.navigate(['trip-listing/see-all']);
  }
  viewDetail(guideDetail){
    this.router.navigate(['/tour-guide' , guideDetail.web_url , guideDetail.place_url]);
  }

}
