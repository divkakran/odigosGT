import { Component, OnInit } from '@angular/core';
import { apiUrl } from '../../app.constants';
import { HttpCallService } from '../../helper/httpCall.service';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending-destination',
  templateUrl: './trending-destination.component.html',
  styleUrls: ['./trending-destination.component.css']
})
export class TrendingDestinationComponent implements OnInit {

  trendingData     :Array<Object>;
  initialOffset    :number = 0;
  initialPage      :number = 9;
  totalNumOfRecords:number;
  buttonDisable    :boolean = false;
  baseImageUrl     : string;
  constructor(private httpCall: HttpCallService ,  private title: Title ,
     private meta: Meta , private route: Router) {
    this.title.setTitle("Trending Destinations | Best Tourist Place In India - Odigos");
    this.meta.addTags([{ name:"description" , content: ' Looking for best tourist place in India ?. Find here trending destination, which you should visit. Through Odigos You can book tour guides for your favourite destinations. ' } ,
    {name:'keywords' , content: 'Trending destinations in India, best tourist place in India , best place in India, Must visit destinations in india'}]);
  }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    this.loadTrendingDestinations(this.initialOffset , this.initialPage);
  }
  loadTrendingDestinations(offset , page){
    this.httpCall.callApi( 'POST' , apiUrl.trending , {offset: offset , page: page}).subscribe((res) => {
      if(res && res["body"] && res["body"].status==1){
        this.buttonDisable = false;
        this.totalNumOfRecords = res["body"].count;
        this.trendingData = res["body"].list;
        this.trendingData.filter((res) => { 
          res['guide_charges'] = Math.round(res['guide_charges']);
        });
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
