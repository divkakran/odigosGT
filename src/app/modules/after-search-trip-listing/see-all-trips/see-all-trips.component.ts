import { Component, OnInit, Input } from '@angular/core';
import { apiUrl } from '../../../app.constants';
import { HttpCallService } from '../../../helper/httpCall.service';
import { Encryption } from '../../../helper/encryption';
import { Router , ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-see-all-trips',
  templateUrl: './see-all-trips.component.html',
  styleUrls: ['./see-all-trips.component.css']
})
export class SeeAllTripsComponent implements OnInit {

  apiData            : Object;
  tourList           : Array<String> ;
  totalNumOfRecords  : number;
  buttonDisable      : boolean = false;
  initialPage        : number = 9;
  initialOffset      : number = 0;
  baseImageUrl       : string;
  constructor(private httpCall: HttpCallService , 
    private route: Router , private ac: ActivatedRoute,) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    // this.apiData = JSON.parse(localStorage.getItem('$datatype'));
    // this.loadTrendingDestinations(this.initialOffset , this.initialPage);
    // getting queryParams
    this.ac.queryParams.subscribe(params => { 
      this.apiData = Object.create(params);
      // var _temp = params['keyword'];
      Object.defineProperty(this.apiData , 'keyword' , {
        writable: true,
        value: this.apiData['keyword'].replace(/-/g, ' ')
      })
      this.apiData['keyword'] =  this.apiData['keyword'].replace(/-/g, ' ');
      this.loadTrendingDestinations(this.initialOffset , this.initialPage);
      // console.log("Parameters received" , params);
      // this.placeName = params['destination'];
      // this.placeName = this.placeName.replace(/-/g, " ");
      // this.loadCategory();
    });
  }
  loadTrendingDestinations(offset , page){
    // let obj = {"cat_id": this.apiData['cat_id'] , "cat_name": this.apiData['cat_name'] ,
    // "offset" : offset , "page": page , "keyword":this.apiData['placeName'] , "no_of_adults": this.apiData['no_of_adults'],
    // "no_of_children": this.apiData['no_of_children'] , "hire_date":this.apiData['hire_date']};

    // new for seo
    let obj = {"cat_id": this.apiData['cat_id'] , "cat_name": this.apiData['cat_name'] ,
    "offset" : offset , "page": page , "keyword":this.apiData['keyword'] , "no_of_adults": this.apiData['no_of_adults'],
    "no_of_children": this.apiData['no_of_children'] , "hire_date":this.apiData['hire_date']};

    this.httpCall.callApi( 'POST' , apiUrl.seeAllTour , obj).subscribe((res) => {
      if(res && res["body"] && res["body"].status==1){
        this.tourList = res["body"].list;
        this.totalNumOfRecords = res["body"].totalCount;
        this.buttonDisable = false;
      }
    });
  }
  loadMoreDestinations(){
    this.buttonDisable = true;
    this.initialPage   = 9+this.initialPage;
    this.loadTrendingDestinations(this.initialOffset , this.initialPage);
  }
  viewDetail(guideDetail){
    this.route.navigate(['/tour-guide' , guideDetail.web_url , guideDetail.place_url]);
  }

}
