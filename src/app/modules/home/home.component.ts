import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../../helper/httpCall.service'

import { environment } from '../../../environments/environment';
import { apiUrl } from '../../app.constants';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';
import { Contact } from '../become-aguide/contact-model';
import { LoadScript } from '../../helper/loadScript';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadAPI: Promise<any>;
  baseImageUrl: String;
  getInTouchObject = { name:'' , email: '' , mobile: '' , city: '' , comment: '' };
  trendingData:Array<string> = [];
  setButtonDisable = false;
  constructor( private httpCall: HttpCallService , private toastr: Toaster ,
    private title: Title , private meta: Meta , private route: Router) { 
      this.title.setTitle("Best Private Tour Guides In India | Book Online Travel Guides - Odigos");
      this.meta.addTags([{ name:"description" , content: 'Book your local private tour guide & explore beautiful cities in India. Odigos provide best online travel guides for your upcoming trip. Find a unique tour experience with our local tourist guides.' } ,
      {name:'keywords' , content: 'Best travel guides, local tour guides, private tour guide, travel tour guide, best online travel guides, local private tour guides, tourism guide, trip guide'}]);
    }

  async ngOnInit() {
    localStorage.removeItem('$trip_date');
    this.baseImageUrl = environment.baseImageUrl;
    await this.httpCall.callApi( 'POST' , apiUrl.trending , {offset: 0 , page:3}).subscribe((res) => {
      if(res && res["body"] && res["body"].status==1){
        this.trendingData = res["body"].list;
        this.trendingData.filter((res) => { 
          res['guide_charges'] = Math.round(res['guide_charges']);
        });
      }this.loadScript();
    });
  }
  getInTouchSubmit(val:any){
    this.setButtonDisable = true;
    let _temp = new Validations().getInTouchValidate(val);
    if(!_temp.isOkay){
      this.toastr.showWaring( _temp.msg );
      this.setButtonDisable = false;
    }else{
      let contact_model = new Contact(val.contact_name , val.contact_mobile , val.contact_email , val.contact_city , val.contact_comments);
      this.httpCall.callApi('POST'  , apiUrl.getInTouch , contact_model).subscribe(res => {
        if(res && res["body"] && res["body"].status == 1){
          for(var value in this.getInTouchObject){
            this.getInTouchObject[value] = '';
          }
          this.setButtonDisable = false;
          this.toastr.showSucess(res["body"].message);
        }else{
          this.setButtonDisable = false;
        }
      });
    }
  }
  loadScript(){ 
    new Promise((resolve) => {
      new LoadScript().loadScript(["../../../assets/js/slick.min.js","../../../assets/js/custom.min.js","../../../assets/js/loadMessangerBot.js"]);
      resolve(true);
    });
  }
  viewDetail(guideDetail){
    this.route.navigate(['/tour-guide' , guideDetail.web_url , guideDetail.place_url]);
  }
}
