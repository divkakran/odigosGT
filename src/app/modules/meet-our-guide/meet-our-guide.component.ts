import { Meta , Title } from '@angular/platform-browser'
import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../../helper/httpCall.service';
import { environment } from '../../../environments/environment';
import { apiUrl } from '../../app.constants';
import { Toaster } from '../../helper/toaster';
import { DataPassingService } from '../../helper/dataPassingService';
import { Router } from '@angular/router';
import { LoadScript } from './../../helper/loadScript';

@Component({
  selector: 'app-meet-our-guide',
  templateUrl: './meet-our-guide.component.html',
  styleUrls: ['./meet-our-guide.component.css']
})
export class MeetOurGuideComponent implements OnInit {

  loadAPI          : Promise<any>;
  baseImageUrl     : String;
  guideList        : Array<String>;
  initialOffset    :number = 0;
  initialPage      :number = 4;
  totalNumOfRecords:number;
  buttonDisable    :boolean = false;

  constructor( private httpCall: HttpCallService ,  private toastr: Toaster , private route: Router , private meta: Meta , private title: Title) {
    this.title.setTitle("Tour And Travel Guides List In India- Odigos");
    this.meta.addTags([{ name:"description" , content: 'Get here all certified & local experts tour guides in India for your upcoming trip. For Booking to guide, Download Odigos for Tourist app today.' } ,
    {name:'keywords' , content: 'Tour guide list india, India tour guide list, india travel guide book, indian guide list, India guide-book'}]);
  }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    this.loadGuides(this.initialOffset , this.initialPage);
  }
  loadGuides(offset , page){
      this.httpCall.callApi('POST' , apiUrl.guideList , {offset:offset , page:page}).subscribe(async (res) => {
      if(res && res["body"]){
        await this.loadInitialGuideList(res);
        this.loadScript();
      }
    });
  }
  loadMoreGuideListing(){
    this.buttonDisable = true;
    this.initialPage   = 4+this.initialPage;
    this.loadGuides(this.initialOffset , this.initialPage);
  }
  loadInitialGuideList(res){
    this.buttonDisable = false;
    if(res["body"].guideList.length == 0){
      this.toastr.showWaring("No More List available")
    }else{
      this.totalNumOfRecords = res["body"].total_records;
      this.guideList = res["body"].guideList; 
      this.guideList.filter((res) => { 
        res['package_charges'] = Math.round(res['package_charges']);
      });
    }
  }
  viewDetail(guideDetail){
    this.route.navigate(['/tour-guide' , guideDetail.web_url , guideDetail.place_url]);
  }
  loadScript(){
    this.loadAPI = new Promise((resolve) => {
      new LoadScript().loadScript(["assets/js/custom.js","assets/js/slick.min.js"]);
      resolve(true);
    });
  }

}
